import express from 'express';
import { create } from '../controllers/commentController.js';
import requireAuth from '../middleware/requireAuth.js';
import validate from '../middleware/validate.js';
import { commentSchema } from '../middleware/schemas.js';

const router = express.Router();
router.post('/:photoId', requireAuth, validate(commentSchema), create);

export default router;
