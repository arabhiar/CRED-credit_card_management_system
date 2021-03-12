const express = require('express');
const router = express.Router();
const registerSchema = require('../schemas/signupSchema');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/auth');

// routes
router.post('/signup', registerSchema, authController.signup);
router.post('/login', loginSchema, authController.login);

module.exports = router;