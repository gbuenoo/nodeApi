const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

// MongoDB Settings
const url = config.db;
const options = {
    poolSize: 5, 
    useNewUrlParser: true, 
};

// Connecting on MongoDB
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

// Monitoring MongoDB
mongoose.connection.on('error', (error) => {
    console.log('Error connecting to the database: \n' + error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Application disconnected from the database!');
});

mongoose.connection.on('connected', () => {
    console.log('Application connected to the database!');
});

//BodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(config.app_port, () => {
    console.log(`API Port: ${config.app_port}`);
    console.log('\nConnecting to the database...');
});


module.exports = app;