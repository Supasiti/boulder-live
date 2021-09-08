const Sequelize = require("sequelize");
const models = require('../models'); 

// return
//  - Array<Score>
// as specified by competitorId and problem ids
const byCompetitorAndProblems = async (competitorId, problemIds) => {
  const result = await models.Score.findAll({
    where : { 
      [Sequelize.Op.and]: [
        { competitorId: competitorId }, 
        { problemId: problemIds } 
      ]
    }
  })
  return result;
}

// get all the scores by a competitor
// return Array<Score>
const byCompetitor = async (competitorId) => {
  const result = await models.Score.findAll({
    where: { competitorId : competitorId },
    include: [
      {
        model: models.Problem
      }
    ]
  })
  return result;
}

module.exports = {
  byCompetitorAndProblems,
  byCompetitor
}