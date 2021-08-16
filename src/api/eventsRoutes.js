const express = require('express');
const getEvents = require('../queries/getEvents')
const router = express.Router();


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