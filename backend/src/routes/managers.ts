import { Router } from 'express';
import {
  getManager, updateManagerInfo, updateManagerAvatar, getCurrentManager,
} from '../controllers/managers';
import { validateObjId, validateAvatar, validateProfile } from '../middlewares/validatons';

const router = Router();

router.get('/me', getCurrentManager);
router.get('/:id', validateObjId, getManager);
router.patch('/me/avatar', validateAvatar, updateManagerAvatar);
router.patch('/me', validateProfile, updateManagerInfo);

export default router;
