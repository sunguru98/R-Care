import multer from 'multer';
import { Request } from 'express';
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (_: Request, file: Express.Multer.File, cb) => {
    if (file.mimetype !== 'text/csv')
      return cb(new Error('Invalid file type'), false);
    else if (file.size > 1024 * 1024 * 10)
      return cb(
        new Error('File size is huge. Try uploading a small file'),
        false
      );
    return cb(null, true);
  }
}).single('routes');

export default upload;
