const models = require('../models');



const createProblemAssignments = async (problemId, categoryIds) => {
  const problemAssignmentArray = categoryIds.map( categoryId => {
    return { problemId, categoryId } 
  })
  const result = await models.ProblemAssignment.bulkCreate(problemAssignmentArray);
  return result;
};


// create a new problems
// arguments : name, categoryIds
// return 
//  - Event
const createOne = async (newProblem) => {

  const problemData = await models.Problem.create(newProblem);
  
  if ( 'categoryIds' in newProblem && newProblem.categoryIds.length) {
    const newProblemAssignments = await createProblemAssignments(problemData.id, newProblem.categoryIds);
    return newProblemAssignments;
  } else {
    return problemData;
  }
}

// remove an event from id
// return 
//  - int
const remove = async (problemId) => {
  const problemsRemoved = await models.Problem.destroy({
    where : {id : problemId }
  })
  return problemsRemoved;
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



module.exports = {
  createOne,
  update,
  remove
}