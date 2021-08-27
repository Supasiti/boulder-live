const router = require('express').Router();
const withAuth = require('../../utils/auth');
const withPurpose = require('../../utils/withPurpose');
const getEvents = require('../queries/getEvents');
const sanitize = require('../services/sanitize');

// routes: /events/

const renderOrganiserEventPage = async (req, res) => {
  const eventId = req.params.eventId;
  const rawEventData = await getEvents.byId(eventId);
  const eventData = sanitize(rawEventData);
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

router.get('/:eventId', withAuth, withPurpose, renderEventPage)

module.exports = router;