import {Router} from 'express';
import {index, findOne, createOne, update, remove} from './categoryController';

const router = Router();

router.get('/', index);
router.get('/:urlKey', findOne);
router.post('/', createOne);
router.put('/:categoryId', update);
router.delete('/:categoryId', remove);

export default router;