const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
// const jwt = require('express-jwt');
// const secret = process.env.SECRET;

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// importing routes
const authRoute = require('./routes/auth');
const cardRoute = require('./routes/card');

// app.use(jwt({ secret: secret, algorithms: ['HS256']}).unless({path: ['/']}));

// Routes middlewares
app.use('/api/user', authRoute);
app.use('/', cardRoute);

app.use(notFound);
app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
