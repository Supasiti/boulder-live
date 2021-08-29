const models = require('../models');
const utils = require('../../utils/arrayUtils');
const sanitize = require('../services/sanitize');

// get problems from ids
// return 
//  - Array<Problem>
const byIds = async (ids) => {
  const result = await models.Problem.findAll({where: { id : ids}});
  return result;
}

// get all the problems that a competitor to compete
// return 
//  - Array<Problem>
const byCompetitorId = async (competitorId) => {
  const totalScores = await models.TotalScore.findAll({
    where : { competitorId : competitorId },
    include : { 
      model: models.Category,
      include: models.Problem
    }
  })
  const problemArrays = totalScores.map((score) => score.category.problems);
  const result =  utils.generateSet(...problemArrays); 
  return result;
}

// get all the problems 
// return 
//  - Array<Problem>
const all = async () => {
  const result = await models.Problem.findAll();
  return result;
}


module.exports = {
  all,
  byIds,
  byCompetitorId
}