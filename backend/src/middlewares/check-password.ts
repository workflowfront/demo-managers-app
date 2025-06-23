import { RequestHandler } from 'express';
import BadRequest from '../errors/bad-request-error';

const checkPassword: RequestHandler = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim()) {
    next(new BadRequest('Поле "ключ" обязательно'));
  } else {
    next();
  }
};

export default checkPassword;
