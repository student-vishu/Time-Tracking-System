const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(20).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(5).max(10).pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/).required(),
    role: Joi.string().trim().valid('backend developer', 'project manager', 'team leader')
});

const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(5).max(10).pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/).required()
});

module.exports = { createUserSchema, loginSchema }