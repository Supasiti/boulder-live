const express = require('express');
const query = require('../../queries');
const services = require('../../services');
const sanitize = require('../../services/sanitize');

const router = express.Router();

// --------------------------------------
// GET - will return a list of all events

const getAllEvents = async (req, res) => {
  try {
    const rawEvents = await query.getAllEvents(req.query);
    const events = sanitize(rawEvents);
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getFullEvent = async (req, res) => {
  try {
    const eventData = await services.event.getOne(req.params.id);
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create an event
const createNewEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const newEventData = { ...req.body, userId };
    const rawEventData = await services.event.create(newEventData);
    const cleanedEventData = sanitize(rawEventData);
    res.status(200).json(cleanedEventData);
  } catch (err) {
    res.status(400).json(err);
  }
};

// update an event
const updateEvent = async (req, res) => {
  try {
    await services.event.update(req.body, req.params.id);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(400).json(err);
  }
};

//----------------------------------------------------------------------------------------
// let user join an event
//
// either create a new competitor or use existing one
const saveCompetitor = (req, res, rawCompetitor) => {
  const cleaned = sanitize(rawCompetitor);

  req.session.save(() => {
    req.session.competitor = cleaned;
    res.json({
      competitor: cleaned,
      message: 'You are successfully join the event!',
    });
  });
};

const joinEvent = async (req, res) => {
  try {
    const userId = req.session.user.id || req.body.userId;
    const competitorData = { userId, eventId: req.params.id };

    // find the saved one
    const savedCompetitor = await query.getCompetitors.one(
      competitorData,
    );
    if (savedCompetitor) {
      saveCompetitor(req, res, savedCompetitor);
      return;
    }
    // or create a new one
    const rawCompetitor = await services.competitor.create(
      competitorData,
    );
    saveCompetitor(req, res, rawCompetitor);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// requests
router.get('/', getAllEvents);
router.post('/create', createNewEvent);
router.post('/:id/join', joinEvent);
router.get('/:id', getFullEvent);
router.put('/:id', updateEvent);

module.exports = router;
