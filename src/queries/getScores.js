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

// return
//  - TotalScore>
// as specified by competitorId and problem ids
const totalByCompetitorAndProblems = async (competitorId, problemIds) => {
  const result = await models.Score.findAll({
    where : { 
      [Sequelize.Op.and]: [
        { competitorId: competitorId }, 
        { problemId: problemIds } 
      ]
    },
    attributes : [
      [Sequelize.fn('SUM', Sequelize.col('score.top')), 'totalTops'],
      [Sequelize.fn('SUM', Sequelize.col('score.bonus')), 'totalBonuses'],
      [Sequelize.fn('SUM', Sequelize.col('score.attempt_top')), 'totalAttemptTops'],
      [Sequelize.fn('SUM', Sequelize.col('score.attempt_bonus')), 'totalAttemptBonuses']
    ]
  })
  return result;
}




module.exports = {
  byCompetitorAndProblems,
  totalByCompetitorAndProblems
}