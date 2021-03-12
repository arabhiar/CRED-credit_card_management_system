const db = require('../models');
const encryptDecrypt = require('./encryptDecrypt');
const calculateOutstandingAmount = require('./calculateOutstandingAmount');



module.exports = {
    addCard: async(req, res) => { 
        try {
            const hashedCardNumber = await encryptDecrypt.encrypt(req.body.cardNumber);
            const userCards = await db.Card.findAll({
                where: {
                    UserId: req.user.id,
                },
            })
            let cardExist = false;
            for(const card of userCards) {
                const currentCardNumber = await encryptDecrypt.decrypt(card.cardNumber);
                if(currentCardNumber === req.body.cardNumber) {
                    cardExist = true;
                    break;
                }
            }
            if(cardExist === true) {
                res.send({ message: "Card is already added!"});
            }
            else {
                const newCard = await db.Card.create({
                    cardOwnerName: req.body.cardOwnerName,
                    cardNumber: hashedCardNumber,
                    expiryMonth: req.body.expiryMonth,
                    expiryYear: req.body.expiryYear,
                    UserId: req.user.id
                });
                res.send(newCard);
            }
        }
        catch(err) {
            res.send({ message: err });
        }
        
    },
    getAllCards: async(req, res) => {
        try {
            const hashedData = await db.Card.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [db.User]
            })

            const originalData = hashedData.map(function(curr) {
                let originalCardNumber = encryptDecrypt.decrypt(curr.cardNumber)
                let cardInfo = {
                    cardOwnerName: curr.cardOwnerName,
                    cardNumber: originalCardNumber,
                    expiryMonth: curr.expiryMonth,
                    expiryYear: curr.expiryYear,
                    // outstandingAmount: 
                    User: curr.User
                }
                return cardInfo;
            })
            res.send(originalData);
        }
        catch(err) {
            res.send({ message: err });
        }
    }
}