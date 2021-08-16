const Category = require('../models/Category')
const Competitor = require('../models/Competitor')
const Event = require('../models/Event');
const Organiser = require('../models/Organiser')
const Problem = require('../models/Problem')
const ProblemAssignment = require('../models/ProblemAssignment')

// clean up if there are categories
const parseEventCategories = (event, result) => {

  if (event.categories){
    result.categories = event.categories.map(c => {
      const parsed = Category.parse(c);
      if (c.problems) {
        parsed.problems = c.problems.map(p => Problem.parse(p));
      }
      return parsed;
    });
  }
  return result;
}

// parse Event data into a nice format == include categories and problems
const parseFull = (event) => {
  if ( event instanceof Event ){
    const result = Event.parse(event);
    return parseEventCategories(event, result);
  }
  return null
}

// get all event
// return 
//  - Array<Object>
const all = async (cleaned=true) => {
  const eventData = await Event.findAll({
    include: {
      model: Category,
      include: Problem
    }
  })
  if (!cleaned || eventData.length === 0) return eventData; 
  return eventData.map(e => parseFull(e));
}


// get all events with a set of ids
// return 
//  - Array<Object>
const byIds = async (eventIds, cleaned=true) => {
  const eventData = await Event.findAll({
    where: { id: eventIds},
    include: {
      model: Category,
      include: Problem
    }
  })
  if (!cleaned || eventData.length === 0) return eventData; 
  return eventData.map(e => parseFull(e));
}

// get all event organised by a user
// return 
//  - Array<Object>
const organisedByUser = async (userId, cleaned=true) => {
  const organisers = await Organiser.findAll({
    attributes : ['eventId'],
    where : { userId : userId}
  })
  const eventIds = organisers.map(o => o.eventId);
  return await byIds(eventIds, cleaned);
}

// get all event competed by a user
// return 
//  - Array<Object>
const competedByUser = async (userId, cleaned=true) => {
  const competitors = await Competitor.findAll({
    attributes : ['eventId'],
    where : { userId : userId}
  })
  const eventIds = competitors.map(o => o.eventId);
  return await byIds(eventIds, cleaned);
}


module.exports = {
  all,
  byIds,
  organisedByUser,
  competedByUser
}