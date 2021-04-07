const verifyStatementSchema = require('../middlewares/verifyStatementSchema');
const Joi = require('joi');
const statementSchema = (req, res, next) => {
    const schema = Joi.object().keys({
        amount: Joi.number().precision(2).required(),
        vendor: Joi.string().required(),
        category: Joi.string().required(),
        credDeb: Joi.boolean().required(),
    })
    const arraySchema = Joi.array().items(schema);
    verifyStatementSchema(req, res, next, arraySchema);
}

module.exports = statementSchema;