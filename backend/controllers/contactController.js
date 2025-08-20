const Joi = require('joi');
const Contact = require('../models/contact');

const contactController = {
    async create(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            message: Joi.string().min(1).max(1000).required()
        });

        const {error} = schema.validate(req.body);
        if (error) {
            return next(error);
        }

        const {username, email, message} = req.body;

        try {
            const doc = await new Contact({ username, email, message }).save();
            return res.status(201).json({
                message: 'Contact message received',
                contact: {
                    id: doc._id,
                    username: doc.username,
                    email: doc.email,
                    message: doc.message,
                    createdAt: doc.createdAt
                }
            });
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = contactController; 