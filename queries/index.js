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
    .lean()
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
    .lean()
    .catch((err) => console.error(err));
  return result;
};

module.exports = {
  getAll,
  getAllEvents,

  getEvent,
  getCompetitor,
};
