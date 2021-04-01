const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const luhnValidation = require('../middlewares/luhnValidation');
const cardSchema = require('../schemas/cardSchema');
const billSchema = require('../schemas/billSchema');
const cardController = require('../controllers/card');
const statementSchema = require('../schemas/statementSchema');

router.post('/', [verifyToken(), cardSchema, luhnValidation], cardController.addCard); 

router.get('/', [verifyToken()], cardController.getAllCards); 

router.get('/:card_id', verifyToken(), cardController.getCardById);

router.post('/:id/pay', [ verifyToken(), billSchema, luhnValidation ], cardController.payBill);

router.get('/:id/statements', [verifyToken(), luhnValidation], cardController.getAllStatements);

router.get('/:id/statements/:year/:month', [verifyToken(), luhnValidation], cardController.getStatementsYearMonth);

router.post('/:id/statements/:year/:month', [verifyToken(), luhnValidation, statementSchema], cardController.postStatement);

module.exports = router;