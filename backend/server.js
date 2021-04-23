const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MondoDb database connection established successfully");
})

const usersRouter = require('./routes/api/users');
const surveysRouter = require('./routes/api/surveys');
const authRouter = require('./routes/api/auth');

app.use('/api/users', usersRouter);
app.use('/api/surveys', surveysRouter);
app.use('/api/auth', authRouter);
//app.use('/login', loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});