const express = require('express');
const registerUser = require('../services/registerUser');

const router = express.Router();

// api/users/

// --------------------------------------
// POST

// register new user

const validatePostRequest = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json('The body of POST request must contain username, email and password');
    return false;
  }
  return true;
};

// creating an organiser account
const handlePostRequest = async (req, res) => {
  if (validatePostRequest(req, res)) {
    try {
      const userDataWithoutPassword = await registerUser(req.body);
      res.status(200).json(userDataWithoutPassword)
    } catch (err){
      res.status(400).json(err)
    }
  };
};


// requests
router.post('/', handlePostRequest);

module.exports = router;