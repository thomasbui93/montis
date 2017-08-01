import { Router } from 'express';
import {index} from './articleController';

const router = Router() ;

router.get('/',  index);
export default router;