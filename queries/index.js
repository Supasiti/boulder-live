const models = require('../models');
// const getAllCategories = require('./getAllCategories');
// const getAllAssignments = require('./getAllAssignments');
// const getAllProblems = require('./getAllProblems');
const getEvent = require('./getEvent');
// const getCompetitor = require('./getCompetitor');
// const getAllScores = require('./getAllScores');
// const getTotalScores = require('./getTotalScores');

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

module.exports = {
  getAll,
  getAllEvents,
  // getAllAssignments,
  // getAllScores,
  getEvent,
  // getCompetitor,
  // getTotalScores,
};
