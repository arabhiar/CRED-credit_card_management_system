const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const luhnValidation = require('../middlewares/luhnValidation');
const cardSchema = require('../schemas/cardSchema');
const cardController = require('../controllers/card');


router.post('/cards', [verifyToken(), cardSchema, luhnValidation], cardController.addCard); // firstly verifying if user is loggedIn or not, then verifying CardNumber using Luhn Validation

router.get('/cards', [verifyToken()], cardController.getAllCards); // firstly checking if user is logged in or not, then searching the cards related to particular id

// router.post('/cards/:id/pay', [verifyToken()], cardController.payBill);

// router.post('/cards/:id/statements/:year/:month', [verifyToken()])

module.exports = router;