const Sequelize = require("sequelize");
const models = require('../models');
const totalScore = require('../services/totalScore')

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

// return
//  - TotalScore>
// as specified by competitorId and problem ids
// const total = async (competitorId, problemIds) => {
//   const scores = await byCompetitorAndProblems(competitorId, problemIds)
//   const result = totalScore.fromScores(scores);
//   return result;
// }


module.exports = {
  byCompetitorAndProblems,
  // total
}