const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    if (err.name === 'MulterError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.message === 'Only JPG, PNG and WEBP images are allowed.') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID.' });
    }

    res.status(err.status || 500).json({
        message: err.status ? err.message : 'Something went wrong on the server.'
    });
};

export default errorHandler;
