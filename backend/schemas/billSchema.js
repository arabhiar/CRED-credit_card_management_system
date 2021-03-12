const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const billSchema = (req, res, next) => {
    const schema = Joi.object({
        amount: Joi.number().require()
    })
    verifySchema(req, next, schema);
}

module.exports = billSchema;