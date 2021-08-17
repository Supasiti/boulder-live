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
const total = async (competitorId, problemIds) => {
  const result = await models.Score.findAll({
    where : { 
      [Sequelize.Op.and]: [
        { competitorId: competitorId }, 
        { problemId: problemIds } 
      ]
    },
    attributes : [
      [Sequelize.cast(Sequelize.fn('SUM', Sequelize.col('score.top')), 'UNSIGNED'), 'totalTops'],
      [Sequelize.cast(Sequelize.fn('SUM', Sequelize.col('score.bonus')), 'UNSIGNED'), 'totalBonuses'],
      [Sequelize.cast(Sequelize.fn('SUM', Sequelize.col('score.attempt_top')), 'UNSIGNED'), 'totalAttemptTops'],
      [Sequelize.cast(Sequelize.fn('SUM', Sequelize.col('score.attempt_bonus')), 'UNSIGNED'), 'totalAttemptBonuses']
    ]
  })
  return result[0].toJSON();
}




module.exports = {
  byCompetitorAndProblems,
  total
}