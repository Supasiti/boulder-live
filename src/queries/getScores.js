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


module.exports = {
  byCompetitorAndProblems,
  // total
}