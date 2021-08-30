const { Event, Organiser } = require('../models');
const query = require('../queries');
const utils = require('../../utils/arrayUtils');
const sanitize = require('./sanitize');

// create a new event
// arguments : name, location, userId
// return 
//  - Event
const create = async (newEventData) => {
  const {name, location, userId} = newEventData;
  const eventData = await Event.create(
    {
      name,
      location,
      organisers : [{ userId }]
    },
    {
      include: [ Organiser ]
    });
  return eventData;
}

// remove an event from id
// return 
//  - int
const remove = async (eventId) => {
  const eventsRemoved = await Event.destroy({
    where : {id : eventId }
  })
  return eventsRemoved;
}

// update an event 
// argument eventData, eventId
// return 
//  - Event
const update = async (eventData, eventId) => {
  const eventsUpdated = await Event.update(eventData, {
    where: { id: eventId }
  })
  if (!eventsUpdated[0]) return null;
  const updatedEvent = await query.getEvents.byIds(eventId);
  return updatedEvent[0];
}

//----------------------------------
// get an event witn nice clean data


//get unique problem assignments from problems
const getAssignmentData = (problems) => {
  const assignmentArrays = problems.map((problem) => problem.problem_assignments);
  const result = [].concat(...assignmentArrays);
  return result;
}

const getOne = async (eventId) => {
  const rawEventData = await query.getEvents.byId(eventId);
  const rawProblemData = await query.getProblems.byEventId(eventId);
  const eventData = sanitize(rawEventData);
  const problemData = sanitize(rawProblemData);
  const assignmentData = getAssignmentData(problemData);
  const result = {
    ...eventData, 
    problems: problemData,
    problemAssignments: assignmentData
  };
  return result;
}

module.exports = {
  create,
  update,
  remove,
  getOne
}