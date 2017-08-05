import {Router} from 'express';
import {index, createOne, update, remove} from "./tagController"
const router = Router();

router.get('/', index);
//router.get('/:urlKey', findOne);
router.post('/', createOne);
router.put('/:tagId', update);
router.delete('/:tagId', remove);
//router.post('/publish/:articleId', publishPost);

export default router;