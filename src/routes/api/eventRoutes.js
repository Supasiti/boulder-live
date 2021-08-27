const express = require('express');
const getEvents = require('../../queries/getEvents')
const createEventRouter = require('./createEventRoutes')

const router = express.Router();


// --------------------------------------
// GET - will return a list of all events 

const getAllEvents = async (req, res) => {
  try {
    const events = await getEvents.all();
    res.status(200).json(events);
  } catch (err){
    res.status(500).json(err)
  }
}



// requests
router.get('/', getAllEvents);
router.get('/create', createEventRouter);

module.exports = router;