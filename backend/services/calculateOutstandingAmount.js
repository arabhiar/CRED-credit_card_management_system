const db = require('../models');
const calculateOutstandingAmount = async(req, res, cardNumber) => {
    let amount = 0;
    let data = db.Transaction.findAll({
        where: {
            cardNumber: cardNumber,
        }
    });
}

module.exports = calculateOutstandingAmount;