const router = require('express').Router();
const withAuth = require('../../utils/auth');
const withPurpose = require('../../utils/withPurpose');
const getEvents = require('../queries/getEvents');
const sanitize = require('../services/sanitize')

// routes: /dashboard/

const getRunningEvents = (events) => {
  return events.filter((event) => event.status === 'running' );
}

const getFutureEvents = (events) => {
  return events.filter((event) => ['open', 'pending'].includes(event.status))
}

const getPastEvents = (events) => {
  return events.filter((event) => ['cancelled', 'closed'].includes(event.status))
}

// organiser dashboard
const renderOrganiserDashboard = async (req, res) => {
  const userId = req.session.user.id;
  const rawEventData = await getEvents.organisedByUser(userId);
  const cleanedEventData = sanitize(rawEventData);  

  // get events into separate categories
  const runningEvents = getRunningEvents(cleanedEventData);
  const futureEvents = getFutureEvents(cleanedEventData);
  const pastEvents = getPastEvents(cleanedEventData);

  res.render('organiserDashboard', {
    loggedIn: req.session.logged_in,
    user: req.session.user,
    runningEvents,
    futureEvents,
    pastEvents
  });
}

//  render competitor dashboard
const renderCompetitorDashboard = async (req, res) => {
  const userId = req.session.user.id;
  const rawEventData = await getEvents.competedByUser(userId);
  const cleanedEventData = sanitize(rawEventData);  

  // get events into separate categories
  const runningEvents = getRunningEvents(cleanedEventData);
  const futureEvents = getFutureEvents(cleanedEventData);

  res.render('competitorDashboard', {
    loggedIn: req.session.logged_in,
    user: req.session.user,
    runningEvents,
    futureEvents,
  });
}
//-------------------------------
// render overall dashboard
const renderDashboard = async (req, res) => {

  if (req.session.purpose === 'organise'){
    await renderOrganiserDashboard(req, res);
  } else {
    await renderCompetitorDashboard(req, res);
  }
};

// router

router.get('/', withAuth, withPurpose, renderDashboard)

module.exports = router;