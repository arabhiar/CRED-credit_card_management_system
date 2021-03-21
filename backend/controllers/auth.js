const authService = require('../services/auth');

module.exports = {
    signup: (req, res, next) => {
        authService.signup(req.body, res)
            .catch(next);
    },
    login: (req, res, next) => {
        authService.login(req.body, res)
            .catch(next);
    },
    getProfile: (req, res, next) => {
        authService.getProfile(req,res)
            .catch(next);
    },
    editProfile: (req, res, next) => {
        authService.editProfile(req, res)
            .catch(next);
    }
};