const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//helper functions

const omitHash = (user) => {
  const { password, ...userwithouthash } = user;
  return userwithouthash;
};

module.exports = {
  login: async (params, res) => {
    const { email, password } = params;
    const user = await db.User.scope('withPassword').findOne({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.statusCode = 401;
      throw new Error('Username or password is incorrect');
    }
    // authentication succesful
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
      expiresIn: '7d',
    });
    res.json({ ...omitHash(user.get()), token });
  },

  signup: async (params, res) => {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
      res.statusCode = 200;
      throw new Error(`email "${params.email}" is already registered!`);
    }

    // hash password
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    const user = await db.User.create(params);
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
      expiresIn: '7d',
    });

    // make dummy profile
    const profile = await db.Profile.create({
      name: '',
      email: params.email,
      UserId: user.id,
    });
    res.json({ ...omitHash(user.get()), token });
  },
  getProfile: async (req, res) => {
    // getting profile using req.user.id

    const userId = req.user.id;
    const userProfile = await db.Profile.findOne({
      where: {
        UserId: userId,
      },
    }).catch(() => {
      res.statusCode = 500;
      throw new Error(`No profile for id: ${userId}`);
    });
    res.status(200).json(userProfile);
  },
  editProfile: async (req, res) => {
    // getting profile using req.user.id

    // rightnow there is only name and authCode to be updated.

    // assuming email can'be changed

    const userId = req.user.id;


    const userProfile = await db.Profile.findOne({
      where: {
        UserId: userId,
      },
    })
      .then(async (data) => {
        const duplicate = {...data};
        if (req.body.name) {
          duplicate.name = req.body.name;
        }


        if (req.body.authCode) {
          duplicate.authCode = req.body.authCode;
        }
        await data
          .update(duplicate)
          .then((editedProfile) => res.json(editedProfile));
      })
      .catch((err) => {
        res.statusCode = 500;
        throw err;
      });
  },
};
