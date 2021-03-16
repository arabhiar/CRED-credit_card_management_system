const cardService = require('../services/card');

module.exports = {
    addCard: async(req, res, next) => {
        cardService.addCard(req, res, next)
            .catch(next);
    },
    getAllCards: async(req, res, next) => {
        cardService.getAllCards(req, res)
            .catch(next);
    },
    payBill: async(req, res, next) => {
        cardService.payBill(req, res)
            .catch(err => res.send(err));
    },
    getAllStatements: async(req, res, next) => {
        cardService.getAllstatements(req, res)
            .catch(err => res.send(err));
    },
    postStatement: async(req, res, next) => {
        cardService.postStatement(req, res)
            .catch(err => res.send(err));
    }
}