const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const rewardSchema = (req, res, next) => {
    const schema = Joi.object({
        couponId: Joi.string().required(),
        companyName: Joi.string().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required(),
        coinsNeeded: Joi.number().integer(),
    })
    verifySchema(req, res, next, schema);
}

module.exports = rewardSchema;