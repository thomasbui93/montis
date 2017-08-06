import { Router } from 'express';
import {removeAll, removeOne, findOne, getAll, updateAll, updateOne, createOne} from "./attributeController"

const router = Router();

router.get('/', getAll);
router.get('/:attributeCode', findOne);
router.post('/', createOne);
router.put('/:attributeCode', updateOne);
router.delete('/:attributeCode', removeOne);
router.post('/massRemove', removeAll);
router.post('/massUpdate', updateAll);

export default router;