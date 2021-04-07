const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const signupSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    verifySchema(req, res, next, schema);
}

module.exports = signupSchema;