const {
  Category,
  Competitor,
  Event,
  Organiser,
  Problem,
  ProblemAssignment } = require('../models')


// get all event
// return 
//  - Array<Event>
const all = async () => {
  const eventData = await Event.findAll({
    include: {
      model: Category,
      include: Problem
    }
  })
  return eventData;
}


// get all events with a set of ids
// return 
//  - Array<Object>
const byIds = async (eventIds) => {
  const result = await Event.findAll({
    where: { id: eventIds},
    include: {
      model: Category,
      include: Problem
    }
  })
  return result;
}

// get all event organised by a user
// return 
//  - Array<Event>
const organisedByUser = async (userId) => {
  const organisers = await Organiser.findAll({
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
  const competitors = await Competitor.findAll({
    attributes : ['eventId'],
    where : { userId : userId}
  })
  const eventIds = competitors.map(o => o.eventId);
  const result = await byIds(eventIds);
  return result;
}


module.exports = {
  all,
  byIds,
  organisedByUser,
  competedByUser
}