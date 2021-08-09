const express = require('express');
const eventQuery = require('../services/eventQuery')
const router = express.Router();

// get success response
const getSuccessResponse = (content) =>  { 
  return {
    status: 'success',
    body: content,
  };
}

// get fail response
const getFailResponse = (message) =>  { 
  return {
    status: 'fail',
    message: message
  };
}

// --------------------------------------
// GET

// will return a list of all events 
const handleGetRequest = (req, res) => {
  eventQuery.getAllEvents()
    .then((events) => res.json(events))
    .catch(console.error);
}




// requests
router.get('/', handleGetRequest);

module.exports = router;