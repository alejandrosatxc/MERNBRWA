const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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
});

const usersRouter = require('./routes/api/users');
const surveysRouter = require('./routes/api/surveys');
const authRouter = require('./routes/api/auth');
const documentsRouter = require('./routes/api/documents');

app.use('/api/users', usersRouter);
app.use('/api/surveys', surveysRouter);
app.use('/api/auth', authRouter);
app.use('/api/documents', documentsRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

    console.log('This shit is prod homie');
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log('process.env.NODE_ENV=' + process.env.NODE_ENV);
});