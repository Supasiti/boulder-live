const { Op } = require('sequelize');
const models = require('../models');
const getCategories = require('../queries/getCategories');


// get associated total scores with score
// arguments : score
// return - Array<TotalScore>
const byScore = async (score) => {
  const { competitorId, problemId } = score;
  const categoryIds = await getCategories.idsByProblemId(problemId);
  const totalScores = await models.TotalScore.findAll({
    where : {
      [Op.and]: [
        { competitorId },
        { categoryId: categoryIds }
      ]
    }
  })
  return totalScores;
}


module.exports = {
  byScore
}