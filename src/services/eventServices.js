const { Event, Organiser } = require('../models');
const getEvents = require('../queries/getEvents');
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
// return 
//  - Event
const update = async (newEvent, eventId) => {
  const eventsUpdated = await Event.update(newEvent, {
    where: { id: eventId }
  })
  if (!eventsUpdated[0]) return null;
  const updatedEvent = await getEvents.byIds(eventId);
  return updatedEvent[0];
}

//----------------------------------
// get an event witn nice clean data

// get unique problems from eventData
const getProblemData = (eventData) => {
  const problemArrays = eventData.categories.map(({ problems }) => problems );
  const problems = utils.generateSetById(...problemArrays);
  const result = problems.sort((a, b) => a.id - b.id);
  return result;
}

//get unique problem assignments from eventData
const getAssignmentData = (eventData) => {
  const problemArrays = eventData.categories.reduce((acc, cur) => {
    return acc.concat(cur.problems);
  }, []);
  const duplicatedAssignments = problemArrays.map(({ problem_assignment }) => problem_assignment )
  const assignments = utils.generateSetById(...duplicatedAssignments);
  const result = assignments.sort((a, b) => a.id - b.id);
  return result;
}


const getOne = async (eventId) => {
  const rawEventData = await getEvents.byId(eventId);
  const eventData = sanitize(rawEventData);
  const problemData = getProblemData(eventData);
  const assignmentData = getAssignmentData(eventData);
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