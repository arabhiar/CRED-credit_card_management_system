const authService = require('../services/auth');

module.exports = {
    signup: (req, res, next) => {
        authService.signup(req.body)
            .then(() => res.json({ message: 'Registration Succesful! '}))
            .catch(next);
    },
    login: (req, res, next) => {
        authService.login(req.body)
            .then(user => res.json(user))
            .catch(next);
    }
};