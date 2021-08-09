const express = require('express');
const path = require('path');
const organiserAuth = require('./organiserAuth');
const organiserQuery = require('../services/organiserQuery');
const { getFailResponse } = require('./responseUtils');

const router = express.Router();


// --------------------------------------
// POST

const validatePostRequest = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    const response = getFailResponse('The body of POST request must contain username, email and password')
    res.json(response);
    return false;
  }
  return true;
};

const respondToPostRequest = (newOrganiser, req, res) => {
  if (newOrganiser){ // if it checks out then send back to log in page
    res.sendFile(path.join(__dirname, '../public/login.html'))
  } else {
    const response = getFailResponse(`An account with email ${req.body.email} already exists`)
    res.json(response);
  }
}

// creating an organiser account
const handlePostRequest = (req, res) => {
  if (validatePostRequest(req, res)) {
    organiserQuery.saveOrganiser(req.body)
      .then((newOrganiser) => respondToPostRequest(newOrganiser, req, res));
  };
};


// requests
router.use('/auth', organiserAuth);
router.post('/', handlePostRequest);

module.exports = router;