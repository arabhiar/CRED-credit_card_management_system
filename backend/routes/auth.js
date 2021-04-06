const express = require('express');
const router = express.Router();
const signupSchema = require('../schemas/signupSchema');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');
const profileSchema = require('../schemas/profileSchema');

// routes
router.post('/signup', signupSchema, authController.signup);
router.post('/login', loginSchema, authController.login);
router.get('/profile', verifyToken(), authController.getProfile);
router.patch('/profile', [verifyToken(), profileSchema], authController.editProfile);

module.exports = router;