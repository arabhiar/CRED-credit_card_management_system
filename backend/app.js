const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorHandling');
dotenv.config();
const PORT = process.env.PORT || 5000;

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// importing routes
const authRoute = require('./routes/auth');
const cardRoute = require('./routes/card');


// Routes middlewares
app.use('/api/user', authRoute);
app.use('/', cardRoute);

// 404 
app.use((req, res) => {
    res.statusCode = 404;
    throw new Error(`404 not found`);
})

// Error Handler
app.use(errorHandler);





db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
})
