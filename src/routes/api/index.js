const express = require('express');
const app = express();
const events = require('./eventRoutes');
const userRoutes = require('./userRoutes');

app.use('/events', events);
app.use('/users', userRoutes);


module.exports = app;