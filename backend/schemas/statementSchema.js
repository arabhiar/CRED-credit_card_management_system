const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const statementSchema = (req, res, next) => {
    const schema = Joi.object({
        amount: Joi.number().precision(2).required(),
        vendor: Joi.string().required(),
        category: Joi.string().required(),
        credDeb: Joi.boolean().required()
        
    })
    verifySchema(req, next, schema);
}

module.exports = statementSchema;