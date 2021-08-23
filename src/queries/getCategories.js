const models = require('../models');
const totalScore = require('../services/totalScore');
const sanitize = require('../services/sanitize');


const getQueryObject = (categoryId) => {
  return {
    where : { id : categoryId },
    include: [{
      model: models.TotalScore,
      include: [{
        model: models.Competitor,
        include: [{
          model: models.User,
          attributes: { exclude : ['password']}
        }] 
      }]
    }]  
  }
}

// it will include competitors in each category and their total scores
// return 
//  - Category 
const withTotalScores = async (categoryId) => {
  if (typeof categoryId !== 'number') throw new Error('Expect an integer as argument')
  
  const queryObject = getQueryObject(categoryId);
  const result = await models.Category.findAll(queryObject)
  return result[0];
}

module.exports = {
  withTotalScores
}