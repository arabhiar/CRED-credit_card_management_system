const db = require('../models');
let calculateOutstandingAmount = async(id, cardId) => {
    let amount = 0;
    let statements = await db.Transaction.findAll({
        where: {
            UserId: id,
            CardId: cardId
        }
    });
    
    for(const statement of statements) {

        if(statement.credDeb) {
            amount -= parseFloat(statement.amount);
        }
        else amount += parseFloat(statement.amount);
    }
    return amount;
}

module.exports = calculateOutstandingAmount;