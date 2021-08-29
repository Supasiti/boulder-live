const express = require('express');
const query = require('../../queries');
const services = require('../../services');
const createEventRouter = require('./createEventRoutes');
const sanitize = require('../../services/sanitize');

const router = express.Router();


// --------------------------------------
// GET - will return a list of all events 

const getAllEvents = async (req, res) => {
  try {
    const rawEvents = await query.getEvents.all();
    const events = sanitize(rawEvents);
    res.status(200).json(events);
  } catch (err){
    res.status(500).json(err)
  }
}

const getFullEvent = async (req, res) => {
  try {
    const eventData = await services.event.getOne(req.params.id);

    console.log('eventRoute: ', eventData);
    res.status(200).json(eventData);
  } catch (err){
    res.status(500).json(err)
  }
}

// requests
router.get('/', getAllEvents);
router.get('/:id', getFullEvent);
router.get('/create', createEventRouter);

module.exports = router;