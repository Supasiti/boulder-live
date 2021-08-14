const Score = require('./models/ScoreDb')
const ProblemAssignment = require('./models/ProblemAssignmentDb')
const Organiser = require('./models/OrganiserDb');
require('./models/CategoryPoolDb');

//  Entry point for the app

const express = require('express');
const path = require('path');
// const api = require('./api/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// app.use('/api', api);
app.use(express.static('public'));



// GET Route for Default ----- PUT THIS LAST!
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/login.html'))
);

module.exports = app;