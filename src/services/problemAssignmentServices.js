const models = require('../models');
const query = require('../queries');

//----------------------------------------------------------------------------------------
const isIn = (assignment, assignmentArray) => {
  const entry = assignmentArray.find((a) => {
    return a.problemId === assignment.problemId && a.categoryId === assignment.categoryId;
  })
  return entry? true : false;
}

const getIdsToRemove = (oldAssignments, newAssignments) => {
  const assignmentToRemove = oldAssignments.filter((o) => {
    // want to remove the one not in new set
    return !isIn(o, newAssignments);
  });
  const result = assignmentToRemove.map(({ id }) => id);
  console.log('\nassignment services: ', result);
  return result;
}

// remove old assignments that are not part of new assignments
const removeOldAssignments = async (oldAssignments, newAssignments) => {
  const idsToRemove = getIdsToRemove(oldAssignments, newAssignments);
  await models.ProblemAssignment.destroy({
    where: { id: idsToRemove }
  })
}

const getDataToCreate = (oldAssignments, newAssignments) => {
  const result = newAssignments.filter((n) => {
    // want to create the one not in the old set
    return !isIn(n, oldAssignments);
  });
  console.log('\nassignment services: ', result);
  return result;
}

// create new assignments that are not part of old assignments
const createNewAssignments = async (oldAssignments, newAssignments) => {
  const toCreate = getDataToCreate(oldAssignments, newAssignments);
  if (toCreate.length) {
    await models.ProblemAssignment.bulkCreate(toCreate);
  }
}

// update or create or remove problemAssignment based on input
// arguments { 
//    eventId, 
//    problemAssignments: Array<{ problemId, categoryId}> } 
// return int
const update = async (newData) => {
  const { eventId, problemAssignments } = newData;
  
  const oldAssignments = await query.getProblemAssignments.byEventId(eventId);
  await removeOldAssignments(oldAssignments, problemAssignments);
  await createNewAssignments(oldAssignments, problemAssignments);  
} 

module.exports = { 
  update
}