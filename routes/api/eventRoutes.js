const router = require('express').Router();
const query = require('../../queries');
const services = require('../../services');

// route: /api/events

// const getUserId = (req) => {
//   if ('session' in req) {
//     if ('user' in req.session) {
//       return req.session.user.id;
//     }
//   }
//   return req.body.userId;
// };

// --------------------------------------
// GET - will return a list of all events

const getAllEvents = async (req, res) => {
  try {
    const events = await query.getAllEvents(req.query);
    res.status(200).json(events);
  } catch (err) {
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
    const openEventPromise = query.getAllEvents({ status: 'open' });
    const runningEventsPromise = query.getAllEvents({
      status: 'running',
    });
    const [openEvents, runningEvents] = await Promise.all([
      openEventPromise,
      runningEventsPromise,
    ]);
    const result = openEvents.concat(runningEvents);
    res.status(200).json(result);
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
    const newEvent = await services.event.create(req.body);
    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
};

// update an event
const updateEvent = async (req, res) => {
  try {
    const updated = await services.event.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({ event: updated, message: 'success' });
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
    const competitorData = { ...req.body, eventId: req.params.id };
    const result = await services.event.join(competitorData);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// get the score board for the event
// const getScoreboard = async (req, res) => {
//   try {
//     const result = await query.getTotalScores.byEvent(req.params.id);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// requests
router.get('/', getAllEvents);
router.get('/running', getAllRunningEvents);
router.post('/', createNewEvent);
router.post('/:id/join', joinEvent);
router.get('/:id', getFullEvent);
router.put('/:id', updateEvent);
// router.get('/:id/scoreboard', getScoreboard);

module.exports = router;
