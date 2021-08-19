const models = require('../models');
const utils = require('../utils/arrayUtils');


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
  const competitor = await models.Competitor.findByPk(
    competitorId,
    { 
      include: 
      {
        model: models.Category,
        include: models.Problem
      }
    }
  )
  const problemArrays = competitor.categories.map(c => c.problems);
  const result =  utils.generateSet(...problemArrays); 
  return result;
}

module.exports = {
  byIds,
  byCompetitorId
}