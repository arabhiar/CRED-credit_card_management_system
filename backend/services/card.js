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
    },
    payBill: async(req, res) => {
        // I've userId, cardNumber and amount, I've to make a transaction (credit) for this particular card.

        // firstly we've to find the hashedCardNumber and then make a transaction corresponding to that.

        
        try {
            const userCards = await db.Card.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            let hashedCardNumber = '';
            let cardId = '';
            
            for(const card of userCards) {
                const originalCardNumber = await encryptDecrypt.decrypt(card.cardNumber);
                if(originalCardNumber === req.params.id) {
                    hashedCardNumber = card.cardNumber;
                    cardId = card.id;
                }
            }
            
            const currentTransaction = await db.Transaction.create({
               amount: req.body.amount,
               vendor: 'NA',
               credDeb: true,
               category: 'NA',
               cardNumber: hashedCardNumber,
               transactionDateTime: Date.now(),
               CardId: cardId,
               UserId: req.user.id,
            });

            res.send({ message: "paid"})
        } catch (err) {
            res.send(err);
        }
    }
}