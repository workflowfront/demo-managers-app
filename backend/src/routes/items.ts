import { Router } from 'express';
import { validateObjId, validateItemBody } from '../middlewares/validatons';

const router = Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require('../controllers/items');

router.get('/', getItems);
router.post('/', validateItemBody, createItem);
router.delete('/:id', validateObjId, deleteItem);
router.put('/:id/likes', validateObjId, likeItem);
router.delete('/:id/likes', validateObjId, dislikeItem);

export default router;
