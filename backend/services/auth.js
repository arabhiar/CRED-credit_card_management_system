const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const encryptDecrypt = require('./encryptDecrypt');
const emailValidator = require('deep-email-validator');

//helper functions

const omitHash = (user) => {
  const { password, ...userwithouthash } = user;
  return userwithouthash;
};

const isValidEmail = async(email) => {
  return await emailValidator.validate(email);
}

module.exports = {
  login: async (params, res) => {
    const { email, password } = params;

    const {valid, reason, validators} = await isValidEmail(email);
    if(valid) {
      const user = await db.User.scope('withPassword').findOne({
        where: { email },
      }).catch((err) => {
        res.statusCode = 500;
        throw new Error(err);
      })
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.statusCode = 401;
        throw new Error('Username or password is incorrect');
      }
      // authentication succesful
      const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
        expiresIn: '7d',
      });
      res.status(200).json({ ...omitHash(user.get()), token });
    }
    else {
      res.statusCode = 400;
      throw new Error('Please provide a valid email address !');
    }
  },

  signup: async (params, res) => {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
      res.statusCode = 409;
      throw new Error(`email "${params.email}" is already registered!`);
    }

    const {valid, reason, validators} = await isValidEmail(params.email);

    if(valid) {
      // hash password
      if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
      }

      // save user
      const user = await db.User.create(params)
        .catch((err) => {
          res.statusCode = 500;
          throw new Error(err);
        })
      const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
        expiresIn: '7d',
      });

      // make dummy profile
      const profile = await db.Profile.create({
        name: '',
        email: params.email,
        UserId: user.id,
        coins: 0
      })
        .catch((err) => {
          res.statusCode = 500;
          throw new Error(err);
        })
      res.status(200).json({ ...omitHash(user.get()), token });
    }
    else {
      res.statusCode = 400;
      throw new Error('Enter a valid email');
    }
  },
  getProfile: async (req, res) => {
    // getting profile using req.user.id
    try {
      const userId = req.user.id;
      const userProfile = await db.Profile.findOne({
        where: {
          UserId: userId,
        },
        attributes: ['id', 'email', 'authCode', 'UserId', 'name', 'phoneNumber', 'reminders', 'coins']
      })
      const duplicate = {...userProfile.dataValues};
      if(userProfile.authCode === null) {
        res.status(200).json(userProfile);
      }
      else {
        duplicate.authCode = await encryptDecrypt.decrypt(userProfile.authCode);
        res.status(200).json(duplicate);
      }
    }
    catch (err) {
      res.statusCode = 500;
      throw new Error(err);
    };
  },
  editProfile: async (req, res) => {
    // getting profile using req.user.id

    // rightnow there is only name and authCode to be updated.

    // assuming email can'be changed

    try {
      const userId = req.user.id;
      const userProfile = await db.Profile.findOne({
        where: {
          UserId: userId,
        },
        attributes: ['id', 'email', 'authCode', 'UserId', 'name', 'phoneNumber', 'reminders', 'coins']
      })
      const duplicate = {...userProfile.dataValues};
      if (req.body.name !== null && req.body.name !== undefined) {
        duplicate.name = req.body.name;
      }

      if (req.body.authCode !== null && req.body.authCode !== undefined) {
        duplicate.authCode = await encryptDecrypt.encrypt(req.body.authCode);
      }


      if(req.body.phoneNumber !== null && req.body.phoneNumber !== undefined) {
        duplicate.phoneNumber = req.body.phoneNumber;
      }
      if(req.body.reminders !== null && req.body.reminders !== undefined) {
        duplicate.reminders = req.body.reminders;
      }
      await userProfile.update(duplicate);
      res.status(200).send(duplicate);
    } catch (error) {
      res.statusCode = 500;
      throw new Error(error);
    }
  },
};
