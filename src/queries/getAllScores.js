const models = require('../models');
const idFilterFactory = require('./idFilter');

const acceptedKeys = ['id', 'problem_id', 'competitor_id'];
const assocModels = {};

const getAllScoresWithFilter = async (rawFilter) => {
  const idFilter = idFilterFactory(
    models.Score,
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
// get all scores with basic details
// return
//  - Array<Score>
const getAllScores = async (rawFilter) => {
  if (rawFilter) {
    const result = await getAllScoresWithFilter(rawFilter);
    return result;
  }
  const result = await models.Score.findAll();
  return result;
};

module.exports = getAllScores;
