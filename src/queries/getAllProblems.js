const models = require('../models');
const idFilterFactory = require('./idFilter');

const acceptedKeys = ['id'];
const assocModels = {
  category_id: {
    model: models.ProblemAssignment,
    field: 'categoryId',
  },
  score_id: { model: models.Score, field: 'id' },
};

const getAllProblemsWithFilter = async (rawFilter) => {
  const idFilter = idFilterFactory(
    models.Problem,
    acceptedKeys,
    assocModels,
  );
  const ids = await idFilter.getIds(rawFilter);
  const result = await models.Problem.findAll({
    where: { id: ids },
  });
  return result;
};

//-------------------------------------
// get all problems with basic details
// return
//  - Array<Problem>
const getAllProblems = async (rawFilter) => {
  if (rawFilter) {
    const result = await getAllProblemsWithFilter(rawFilter);
    return result;
  }
  const result = await models.Problem.findAll();
  return result;
};

module.exports = getAllProblems;
