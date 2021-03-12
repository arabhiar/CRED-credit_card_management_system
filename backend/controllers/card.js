const cardService = require('../services/card');

module.exports = {
    addCard: async(req, res, next) => {
        cardService.addCard(req, res)
            .catch(err => res.send(err));
    },
    getAllCards: async(req, res, next) => {
        cardService.getAllCards(req, res)
            .catch(err => res.send(err));
    }
}