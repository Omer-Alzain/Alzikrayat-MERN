import fs from 'node:fs/promises';

const validate = (schema) => async (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        if (req.file) await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({
            message: 'Please check the submitted information.',
            errors: error.details.map((detail) => detail.message)
        });
    }

    req.body = value;
    next();
};

export default validate;
