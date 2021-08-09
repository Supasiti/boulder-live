const express = require('express');
const app = express();
const events = require('./events');


app.use('/events', events);

module.exports = app;