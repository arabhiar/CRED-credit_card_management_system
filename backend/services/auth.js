const db = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//helper functions

const omitHash = (user) => {
    const { password, ...userwithouthash } = user;
    return userwithouthash;
}

module.exports = {
    login: async(params, res) => {
        const {email, password} = params;
        const user = await db.User.scope('withPassword').findOne({ where: { email } });
        // console.log(password, user.password);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            res.statusCode = 401;
            throw new Error('Username or password is incorrect');
        }
        // authentication succesful
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
        res.json({...omitHash(user.get()), token});
    },
    
    signup: async(params, res) => {
        // validate
        if(await db.User.findOne({ where: { email: params.email } })) {
            res.statusCode = 200;
            throw new Error(`email "${params.email}" is already registered!`);
        }

        // hash password
        if(params.password) {
            params.password = await bcrypt.hash(params.password, 10);
        }

        // save user
        const user = await db.User.create(params);
        res.json({ ...omitHash(user.get())});
    },
    
}