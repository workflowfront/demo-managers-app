import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import Manager from '../models/manager';
import { JWT_SECRET } from '../config';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return Manager.findManagerByCredentials(email, password)
    .then((manager) => {
      const token = jwt.sign({ _id: manager._id }, JWT_SECRET);
      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

const createManager = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Manager.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(err);
      }
    });
};

const getManagerData = (id: string, res: Response, next: NextFunction) => {
  Manager.findById(id)
    .orFail(() => new NotFoundError('Пользователь по заданному id отсутствует в базе'))
    .then((managers) => res.send(managers))
    .catch(next);
};

const getManager = (req: Request, res: Response, next: NextFunction) => {
  getManagerData(req.params.id, res, next);
};

const getCurrentManager = (req: Request, res: Response, next: NextFunction) => {
  getManagerData(req.user._id, res, next);
};

const updateManagerData = (req: Request, res: Response, next: NextFunction) => {
  const { user: { _id }, body } = req;
  Manager.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь по заданному id отсутствует в базе'))
    .then((manager) => res.send(manager))
    .catch(next);
};

const updateManagerInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => updateManagerData(req, res, next);

const updateManagerAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => updateManagerData(req, res, next);

export {
  login,
  updateManagerInfo,
  updateManagerAvatar,
  createManager,
  getManager,
  getCurrentManager,
};
