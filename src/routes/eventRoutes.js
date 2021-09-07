const router = require('express').Router();
const withAuth = require('../../utils/auth');
const withPurpose = require('../../utils/withPurpose');
const query = require('../queries');
const services = require('../services');
const sanitize = require('../services/sanitize');

// routes: /events/

const getAvailableEvents = (events) =>
  events.filter((event) => ['open', 'running'].includes(event.status));

const renderSearchEvent = async (req, res) => {
  const rawEventData = await query.getEvents.all();
  const cleaned = sanitize(rawEventData);
  const available = getAvailableEvents(cleaned);

  res.render('searchEvent', {
    loggedIn: req.session.logged_in,
    events: available,
  });
};

// render organiser event

const renderOrganiserEventPage = async (req, res) => {
  // TODO - need to check that userId matches event id in organiser list
  const { eventId } = req.params;
  const eventData = await services.event.getOne(eventId);

  res.render('eventpage', {
    loggedIn: req.session.logged_in,
    event: eventData,
  });
};

//---------------------------------------------------------------------------------------
// render event page for competitor

// get other categories not enrolled to compete in
const getAvailableCategories = (event, competeIn) => {
  const competeInIds = competeIn.map(({ id }) => id);
  const result = event.categories.filter((c) => !competeInIds.includes(c.id));
  return result;
};

const renderCompetitorEventPage = async (req, res) => {
  if (!req.session.competitor) {
    res.redirect('/dashboard');
    return;
  }
  const competitorId = req.session.competitor.id;
  const { eventId } = req.params;

  const rawEventData = await query.getEvents.byId(eventId);
  const rawCompeteIn = await query.getCategories.all({
    competitor_id: competitorId,
  });
  const rawScores = await query.getScores.byCompetitor(competitorId);

  const eventData = sanitize(rawEventData);
  const competeIn = sanitize(rawCompeteIn);
  const scores = sanitize(rawScores);

  res.render('competitorEvent', {
    loggedIn: req.session.logged_in,
    competeIn,
    availableCategories: getAvailableCategories(eventData, competeIn),
    scores,
  });
};

// render overall event page
const renderEventPage = async (req, res) => {
  if (req.session.purpose === 'organise') {
    await renderOrganiserEventPage(req, res);
  } else {
    await renderCompetitorEventPage(req, res);
  }
};

// render  event scoreboard
const renderEventScoreboard = async (req, res) => {
  const { eventId } = req.params;

  const rawData = await query.getTotalScores.byEvent(eventId);
  const event = sanitize(rawData);

  res.render('eventScoreboard', {
    loggedIn: req.session.logged_in,
    event,
  });
};

// router
router.get('/search', withAuth, withPurpose, renderSearchEvent);
router.get('/:eventId', withAuth, withPurpose, renderEventPage);
router.get(
  '/:eventId/scoreboard',
  withAuth,
  withPurpose,
  renderEventScoreboard,
);

module.exports = router;
