import Photo from '../models/Photo.js';
import Comment from '../models/Comment.js';

const create = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) return res.status(404).json({ message: 'Photo not found.' });

        const comment = await Comment.create({
            photoId: photo._id,
            userId: req.session.userId,
            comment: req.body.comment
        });

        await comment.populate('userId', 'firstName lastName');
        res.status(201).json({ message: 'Comment added.', comment });
    } catch (error) {
        next(error);
    }
};

export { create };
