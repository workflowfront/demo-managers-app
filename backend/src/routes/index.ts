import {
  Router, Request, Response, NextFunction,
} from 'express';
import managerRouter from './managers';
import itemRouter from './items';
import auth from '../middlewares/auth';
import NotFoundError from '../errors/not-found-error';
import {
  createManager, login,
} from '../controllers/managers';
import { validateUserBody, validateAuthentication } from '../middlewares/validatons';

const router = Router();
// Тест - приложение должно работать в процессе, который при падении автоматически восстанавливается
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Произошла ошибка на сервере');
  }, 0);
}); 
router.post('/signup', validateUserBody, createManager);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/managers', managerRouter);
router.use('/items', itemRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});

export default router;
