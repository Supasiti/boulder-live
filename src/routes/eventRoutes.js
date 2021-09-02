const router = require('express').Router();
const withAuth = require('../../utils/auth');
const withPurpose = require('../../utils/withPurpose');
const query = require('../queries');
const services = require('../services');
const sanitize = require('../services/sanitize');

// routes: /events/

const renderSearchEvent = async (req, res) => {
  const rawEventData = await query.getEvents.all();
  const cleaned = sanitize(rawEventData);
  res.render('searchEvent', {
    loggedIn: req.session.logged_in,
    events: cleaned
  });
};

// render organiser event
const renderOrganiserEventPage = async (req, res) => {
  const eventId = req.params.eventId;
  const eventData = await services.event.getOne(eventId);
  
  res.render('eventpage', {
    loggedIn: req.session.logged_in,
    event: eventData
  });
};


// TODO - need to check that userId matches event id in organiser list 

// render overall event page
const renderEventPage = async (req, res) => {

  if (req.session.purpose === 'organise'){
    await renderOrganiserEventPage(req, res);
  } else {
    res.render('eventpage', {
      loggedIn: req.session.logged_in,
      user: req.session.user
    });
  }
};



// router
router.get('/search', withAuth, withPurpose, renderSearchEvent)
router.get('/:eventId', withAuth, withPurpose, renderEventPage)

module.exports = router;