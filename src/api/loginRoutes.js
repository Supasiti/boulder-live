const express = require('express');
const authenticateUser = require('../services/authenticateUser');

const router = express.Router();

// api/users/login/

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
      const isValid = await authenticateUser(req.body);
      if (isValid) {
        res.status(200).json({ message: 'You are now logged in!' });
      } else {
        res.status(404).json({ message: 'Login failed. Please try again!' });
      }
    } catch (err){
      res.status(500).json(err)
    }
  }
}


// requests
router.post('/', handleAuthenticationRequest)

module.exports = router;