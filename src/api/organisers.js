const express = require('express');
const path = require('path');
const organiserQuery = require('../services/organiserQuery');
const {
  getSuccessResponse,
  getFailResponse
} = require('./responseUtils');


const router = express.Router();



// --------------------------------------
// GET

// will return a list of all events 
const handleGetRequest = (req, res) => {
  const {email} = req.query;

  if (email) {
    organiserQuery.getOrganiserByEmail(email)
      .then((organiser) => res.json(organiser))
      .catch(console.error);
    return
  }
  const failResponse = getFailResponse(`An organiser with email ${email} doesn't exist.`)
  res.json(failResponse);
}


// --------------------------------------
// POST

const validatePostRequest = (req, res) => {
  console.log(req.body.username);
  if (!req.body.username || !req.body.email || !req.body.password) {
    const response = getFailResponse('The body of POST request must contain username, email and password')
    res.json(response);
    return false;
  }
  return true;
};


// creating an organiser account
const handlePostRequest = (req, res) => {

  if (validatePostRequest(req, res)) {
    
    const newOrganiser = organiserQuery.saveOrganiser(req.body)
    const response = getSuccessResponse(newOrganiser) 
    res.sendFile(path.join(__dirname, '../public/login.html'))
  }
}


// requests
router.get('/', handleGetRequest);
router.post('/', handlePostRequest);

module.exports = router;