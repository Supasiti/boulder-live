const express = require('express');
const createEvent = require('../queries/getEvents')
const router = express.Router();

// --------------------------------------
// POST - create an event

const validatePostRequest = (req, res) => {
  if (!req.body.name || !req.body.location || !req.body.userId) {
    res.status(400).json('The body of POST request must contain userId, name and location');
    return false;
  }
  return true;
};

// creating an account
const handlePostRequest = async (req, res) => {
  if (validatePostRequest(req, res)) {
    try {
      const eventData = await createEvent(req.body);
      res.status(200).json(eventData);
    } catch (err){
      res.status(400).json(err)
    }
  };
};

// requests
router.get('/', handlePostRequest);

module.exports = router;