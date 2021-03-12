const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const cardSchema = (req, res, next) => {
    const schema = Joi.object({
        cardOwnerName: Joi.string().required(),
        cardNumber: Joi.string().required(),
        expiryMonth: Joi.number().integer().min(1).max(12).required(),
        expiryYear: Joi.number().integer().min(2021).max(3000).required()
        
    })
    verifySchema(req, next, schema);
}

module.exports = cardSchema;