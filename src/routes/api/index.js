const express = require('express');
const app = express();
const events = require('./events');
const userRoutes = require('./userRoutes');

// app.use('/events', events);
app.use('/users', userRoutes);
app.use('/login', login);

module.exports = app;