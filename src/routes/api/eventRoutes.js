const router = require('express').Router();
const query = require('../../queries');
const services = require('../../services');
const sanitize = require('../../services/sanitize');

// route: /api/events

const getUserId = (req) => {
  if ('session' in req) {
    if ('user' in req.session) {
      return req.session.user.id;
    }
  }
  return req.body.userId;
};

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
    const eventData = await query.getEvent(req.params.id);
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllRunningEvents = async (req, res) => {
  try {
    const eventData = await query.getAllEvents({
      status: ['open', 'running'],
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create an event
// expect : {
//   userId : int,  required
//   name: String, required
//   location: String, required
// }
const createNewEvent = async (req, res) => {
  try {
    const userId = getUserId(req);
    const newEventData = { ...req.body, userId };
    const raw = await services.event.create(newEventData);
    const cleaned = sanitize(raw);
    res.status(200).json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// update an event
const updateEvent = async (req, res) => {
  try {
    const updated = await services.event.update(
      req.body,
      req.params.id,
    );
    const cleaned = sanitize(updated);
    res.status(200).json({ event: cleaned, message: 'success' });
  } catch (err) {
    res.status(400).json(err);
  }
};

//--------------------------------------------------------------------
// let user join an event

// let competitor join event
// argument : { userId } and params id
// return {
//   competitor: Number,
//   scores: Array<Score>
//   categoryIds: Array<int>
// }
const joinEvent = async (req, res) => {
  try {
    const userId = getUserId(req);
    const competitorData = { userId, eventId: req.params.id };
    const result = await services.event.join(competitorData);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// get the score board for the event
const getScoreboard = async (req, res) => {
  try {
    const result = await query.getTotalScores.byEvent(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

// requests
router.get('/', getAllEvents);
router.get('/running', getAllRunningEvents);
router.post('/', createNewEvent);
router.post('/:id/join', joinEvent);
router.get('/:id', getFullEvent);
router.put('/:id', updateEvent);
router.get('/:id/scoreboard', getScoreboard);

module.exports = router;
