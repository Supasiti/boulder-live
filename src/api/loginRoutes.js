const express = require('express');
const path = require('path');
const query = require('../services/organiserQuery');
const { getFailResponse } = require('./responseUtils');

const router = express.Router();


// --------------------------------------
// POST
const validatePostRequest = (req, res) => {
  if (!req.body.email || !req.body.password) {
    const response = getFailResponse('The body of POST request must contain email and password')
    res.json(response);
    return false;
  }
  return true;
};

const respondToPostRequest = (id, res) => {
  if (id){ // if it checks out then send back to log in page
    res.sendFile(path.join(__dirname, '../public/dashboard.html'))
  } else {
    const response = getFailResponse(`Either email or password are incorrect.`)
    res.json(response);
  }
}

// will return a list of all events 
const handleAuthenticationRequest = (req, res) => {

  if (validatePostRequest(req, res)) {
    query.authenticateOrganiser(req.body.email, req.body.password)
      .then((id) => respondToPostRequest(id, res))
      .catch(console.error);
  }
}


// requests
router.post('/', handleAuthenticationRequest)

module.exports = router;