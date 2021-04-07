const Luhn = require('luhn-js');

const luhnValidation = async(req, res, next) => {
    if(req.params.id) {
        req.body.cardNumber = req.params.id;
    }
    const validCard = await Luhn.isValid(req.body.cardNumber);
    if(validCard === false) {
        res.statusCode = 422;
        next(`Card is not valid!`);
    }
    else {
        next();
    }
}

module.exports = luhnValidation;


