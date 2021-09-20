const models = require('../models');
const idFilterFactory = require('./idFilter');

const acceptedKeys = ['id', 'categoryId', 'problemId'];
const assocModels = {
  eventId: { model: models.Problem, field: 'eventId' },
};

const getAllAssignmentsWithFilter = async (rawFilter) => {
  const idFilter = idFilterFactory(
    models.ProblemAssignment,
    acceptedKeys,
    assocModels,
  );
  const ids = await idFilter.getIds(rawFilter);
  const result = await models.ProblemAssignment.findAll({
    where: { id: ids },
  });
  return result;
};

//-------------------------------------
// get all events with basic details
// return
//  - Array<ProblemAssignments>
const getAllAssignments = async (rawFilter) => {
  if (rawFilter) {
    const result = await getAllAssignmentsWithFilter(rawFilter);
    return result;
  }
  const result = await models.ProblemAssignment.findAll();
  return result;
};

module.exports = getAllAssignments;
