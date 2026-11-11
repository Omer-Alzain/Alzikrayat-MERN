import fs from 'node:fs/promises';
import path from 'node:path';
import Photo from '../models/Photo.js';
import Comment from '../models/Comment.js';

const getAll = async (req, res, next) => {
    try {
        const photos = await Photo.find()
            .populate('userId', 'firstName lastName')
            .sort({ dateTime: -1 });
        res.json({ photos });
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id)
            .populate('userId', 'firstName lastName location occupation');

        if (!photo) return res.status(404).json({ message: 'Photo not found.' });

        const comments = await Comment.find({ photoId: photo._id })
            .populate('userId', 'firstName lastName')
            .sort({ dateTime: 1 });

        res.json({ photo, comments });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please choose a photo to upload.' });
        }

        const photo = await Photo.create({
            userId: req.session.userId,
            fileName: req.file.filename,
            title: req.body.title,
            description: req.body.description || ''
        });

        await photo.populate('userId', 'firstName lastName');
        res.status(201).json({ message: 'Photo uploaded successfully.', photo });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const photo = await Photo.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found or you do not have permission to delete it.' });
        }

        await Comment.deleteMany({ photoId: photo._id });
        await photo.deleteOne();
        const filePath = path.join(process.cwd(), 'uploads', path.basename(photo.fileName));
        await fs.unlink(filePath).catch(() => {});

        res.json({ message: 'Photo deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

export { getAll, getOne, create, remove };
