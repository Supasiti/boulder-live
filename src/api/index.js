const express = require('express');
const app = express();
const events = require('./events');
const organisers = require('./organisers');

app.use('/events', events);
app.use('/organisers', organisers);

module.exports = app;