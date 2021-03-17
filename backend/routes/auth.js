const express = require('express');
const router = express.Router();
const signupSchema = require('../schemas/signupSchema');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/auth');

// routes
router.post('/signup', signupSchema, authController.signup);
router.post('/login', loginSchema, authController.login);

module.exports = router;