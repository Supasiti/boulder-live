const models = require('../models')


// get all event - with categories
// return 
//  - Array<Event>
const all = async () => {
  const eventData = await models.Event.findAll({
    include: [ models.Category ]
  })
  return eventData;
}


// get all events with a set of ids
// return 
//  - Array<Event>
const byIds = async (eventIds) => {
  const result = await models.Event.findAll({ where: { id: eventIds} })
  return result;
}

// get an event with an id
// return 
//  - Event
const byId = async (eventId) => {
  const result = await models.Event.findOne({ 
    where: { id: eventId },
    include: { model: models.Category }
  })
  return result;
}

// get all event organised by a user
// return 
//  - Array<Event>
const organisedByUser = async (userId) => {
  const organisers = await models.Organiser.findAll({
    attributes : ['eventId'],
    where : { userId : userId}
  })
  const eventIds = organisers.map(o => o.eventId);
  const result = await byIds(eventIds);
  return result;
}

// get all event competed by a user
// return 
//  - Array<Object>
const competedByUser = async (userId) => {
  const competitors = await models.Competitor.findAll({
    attributes : ['eventId'],
    where : { userId : userId}
  })
  const eventIds = competitors.map(o => o.eventId);
  const result = await byIds(eventIds);
  return result;
}


module.exports = {
  all,
  byId,
  byIds,
  organisedByUser,
  competedByUser
}