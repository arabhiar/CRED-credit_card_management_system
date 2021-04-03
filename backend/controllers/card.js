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
    getCardById: async(req, res, next) => {
        cardService.getCardById(req, res)
            .catch(next);
    },
    payBill: async(req, res, next) => {
        cardService.payBill(req, res)
            .catch(next);
    },
    getAllStatements: async(req, res, next) => {
        cardService.getAllstatements(req, res)
            .catch(next);
    },
    getStatementsYearMonth: async(req, res, next) => {
        cardService.getStatementsYearMonth(req, res)
            .catch(next);
    },
    postStatement: async(req, res, next) => {
        cardService.postStatement(req, res)
            .catch(next);
    },
    getSmartStatementData: async(req, res, next) => {
        cardService.getSmartStatementData(req, res)
            .catch(next);
    },
    getSmartStatementYearMonth: async(req, res, next) => {
        cardService.getSmartStatementYearMonth(req, res)
            .catch(next);
    },
}