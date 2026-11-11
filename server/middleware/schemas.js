import Joi from 'joi';

export const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().email().max(100).required(),
    password: Joi.string().min(8).max(72).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.'
    }),
    location: Joi.string().trim().max(100).allow('').optional(),
    description: Joi.string().trim().max(500).allow('').optional(),
    occupation: Joi.string().trim().max(100).allow('').optional()
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
});

export const photoSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    description: Joi.string().trim().max(2000).allow('').optional()
});

export const commentSchema = Joi.object({
    comment: Joi.string().trim().min(1).max(1000).required()
});
