import {
  Request, Response, NextFunction,
} from 'express';
import Item from '../models/item';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

const getItems = (req: Request, res: Response, next: NextFunction) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req: Request, res: Response, next: NextFunction) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Item.create({ name, link, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Item.findById(id)
    .orFail(() => new NotFoundError('Нет карточки по заданному id'))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        return Item.deleteOne({ _id: item._id })
          .then(() => res.send(item));
      }
    })
    .catch(next);
};

const updateLike = (req: Request, res: Response, next: NextFunction, method: string) => {
  const { params: { id } } = req;
  Item.findByIdAndUpdate(id, { [method]: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Нет карточки по заданному id'))
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

const likeItem = (req: Request, res: Response, next: NextFunction) => updateLike(req, res, next, '$addToSet');

const dislikeItem = (req: Request, res: Response, next: NextFunction) => updateLike(req, res, next, '$pull');

export {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
