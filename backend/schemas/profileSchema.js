const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const profileSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string(),
        authCode: Joi.string(),
        reminders: Joi.boolean(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/)
    })
    verifySchema(req, res, next, schema);
}

module.exports = profileSchema;