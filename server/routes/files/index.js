import { Router } from 'express';
import {index, uploadMedia, getAllMedia, getOneMedia} from "./mediaController"
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const router = Router();

const storage = multer.diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

const uploadMediaMiddleware = multer({ storage: storage });

router.get('/', index);
router.post('/media', uploadMediaMiddleware.single('test'), uploadMedia);
router.get('/media', getAllMedia);
router.get('/media/:mediaId', getOneMedia);

export default router;