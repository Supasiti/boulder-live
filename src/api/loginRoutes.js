const express = require('express');
const authenticateUser = require('../services/authenticateUser');

const router = express.Router();


// --------------------------------------
// POST
const validatePostRequest = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json('The body of POST request must contain email and password');
    return false;
  }
  return true;
};

// will return a list of all events 
const handleAuthenticationRequest = async (req, res) => {
  if (validatePostRequest(req, res)) {
    try {
      const response = await authenticateUser(req.body);
      res.status(response.status).json(response.body);
    } catch (err){
      res.status(500).json(err)
    }
  }
}


// requests
router.post('/', handleAuthenticationRequest)

module.exports = router;