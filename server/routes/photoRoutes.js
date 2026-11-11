import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { getAll, getOne, create, remove } from '../controllers/photoController.js';
import requireAuth from '../middleware/requireAuth.js';
import validate from '../middleware/validate.js';
import { photoSchema } from '../middleware/schemas.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, path.join(process.cwd(), 'uploads')),
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        callback(null, `${randomUUID()}${extension}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new Error('Only JPG, PNG and WEBP images are allowed.'));
        }
        callback(null, true);
    }
});

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', requireAuth, upload.single('photo'), validate(photoSchema), create);
router.delete('/:id', requireAuth, remove);

export default router;
