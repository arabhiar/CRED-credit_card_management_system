const Luhn = require('luhn-js');

const luhnValidation = async(req, res, next) => {
    const validCard = await Luhn.isValid(req.body.cardNumber);
    console.log(validCard)
    if(validCard === false) {
        next(`Card Number ${req.body.cardNumber} is not valid!`)
    }
    else {
        next();
    }
}

module.exports = luhnValidation;


