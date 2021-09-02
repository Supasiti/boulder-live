const router = require('express').Router();
const withAuth = require('../../utils/auth');
const withPurpose = require('../../utils/withPurpose');
const query = require('../queries');
const services = require('../services');
const sanitize = require('../services/sanitize');

// routes: /events/

const getAvailableEvents = (events) => {
  return events.filter((event) => ['open', 'running'].includes(event.status))
}

const renderSearchEvent = async (req, res) => {
  const rawEventData = await query.getEvents.all();
  const cleaned = sanitize(rawEventData);
  const available = getAvailableEvents(cleaned);

  res.render('searchEvent', {
    loggedIn: req.session.logged_in,
    events: available
  });
};

// render organiser event

const renderOrganiserEventPage = async (req, res) => {
  // TODO - need to check that userId matches event id in organiser list 
  const eventId = req.params.eventId;
  const eventData = await services.event.getOne(eventId);
  
  res.render('eventpage', {
    loggedIn: req.session.logged_in,
    event: eventData
  });
};

// render event page for competitor

//// NOT finish need to create two lists of categories 
// - already registered
// - can register

const renderCompetitorEventPage = async (req, res) => {
  if (!req.session.competitor) {
    res.redirect('/dashboard');
    return
  }
  const competitorId = req.session.competitor.id;
  console.log(competitorId)

  const eventId = req.params.eventId;
  const eventData = await services.event.getOne(eventId);
  const rawCompeteIn = await query.getCategories.all({ competitor_id: competitorId })
  const competeIn = sanitize(rawCompeteIn);

  console.log('\n event Route: ', competeIn);


  res.render('competitorEvent', {
    loggedIn: req.session.logged_in,
    event: eventData
  });
};



// render overall event page
const renderEventPage = async (req, res) => {

  if (req.session.purpose === 'organise'){
    await renderOrganiserEventPage(req, res);
  } else {
    await renderCompetitorEventPage(req, res);
  }
};

// router
router.get('/search', withAuth, withPurpose, renderSearchEvent)
router.get('/:eventId', withAuth, withPurpose, renderEventPage)

module.exports = router;