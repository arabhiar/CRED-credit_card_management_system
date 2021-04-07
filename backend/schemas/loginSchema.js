const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    verifySchema(req, res, next, schema);
}

module.exports = loginSchema;