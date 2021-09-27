const models = require('../models');
const getEvent = require('./getEvent');

//-------------------------------------
// get all events with basic details
// return
//  - Array<Event>
const getAllEvents = async (rawFilter) => {
  const filter = rawFilter || {};

  const result = await models.Event.find(filter)
    .populate({ path: 'organisedBy', select: 'username' })
    .select(['name', 'location', 'status', 'organisedBy'])
    .catch((err) => console.error(err));
  return result;
};

// get all entities with basic details
const getAll = async (entity, rawFilter) => {
  if (entity in models) {
    const filter = rawFilter || {};
    const result = await models[entity].find(filter);
    return result;
  }
  return null;
};

// get Competitor data
// argument: competitorId
const getCompetitor = async (id) => {
  const result = await models.Competitor.findById(id)
    .populate('scores')
    .populate({ path: 'event', select: 'name location' })
    .populate('categories')
    .catch((err) => console.error(err));
  return result;
};

// get all total scores from an event organised by categories
// arguments : eventId
// return -  Array<Category>
const getScoreboard = async (eventId) => {
  const result = await models.Category.find({
    event: eventId,
  })
    .select('name totalScores')
    .populate({
      path: 'totalScores',
      sort: {
        tops: 'desc',
        bonuses: 'desc',
        attemptTop: 'asc',
        attemptBonus: 'asc',
      },
      populate: {
        path: 'competitor',
        select: 'user number -_id',
        populate: { path: 'user', select: 'username -_id' },
      },
    });

  return result;
};

module.exports = {
  getAll,
  getAllEvents,
  getEvent,
  getCompetitor,
  getScoreboard,
};
