const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
// const jwt = require('express-jwt');
// const secret = process.env.SECRET;

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// importing routes
const authRoute = require('./routes/auth');
const cardRoute = require('./routes/card');

// app.use(jwt({ secret: secret, algorithms: ['HS256']}).unless({path: ['/']}));

// Routes middlewares
app.use('/api/user', authRoute);
app.use('/', cardRoute);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
})
