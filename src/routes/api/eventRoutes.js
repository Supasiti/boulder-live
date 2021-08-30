const express = require('express');
const query = require('../../queries');
const services = require('../../services');
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
    res.status(200).json(eventData);
  } catch (err){
    res.status(500).json(err)
  }
}


// create an event
const createNewEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const newEventData = {...req.body, userId}
    const rawEventData = await services.event.create(newEventData);
    const cleanedEventData = sanitize(rawEventData);
    res.status(200).json(cleanedEventData);
  } catch (err){
    res.status(400).json(err)
  }
};


// requests
router.get('/', getAllEvents);
router.post('/create', createNewEvent);
router.get('/:id', getFullEvent);

module.exports = router;