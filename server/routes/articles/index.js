import { Router } from 'express';
import { index, findOne, createOne, update, remove } from './articleController';

const router = Router();

router.get('/', index);
router.get('/:urlKey', findOne);
router.post('/', createOne);
router.put('/:articleId', update);
router.delete('/:articleId', remove);

export default router;