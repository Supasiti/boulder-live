const models = require('../models');
const getProblems = require('./getProblems');
const totalScore = require('../services/totalScore');

// it will include competitors in each category and their scores
// return 
//  - Array<Category> 
const withScores = async (categoryId) => {
  if (typeof categoryId !== 'number') throw new Error('Expect an integer as argument')
    
  // get problem ids for this category
  const problemIds = await getProblems.idsByCategories(categoryId);

  const category = await models.Category.findAll({
    where : { id: categoryId },
    include : [
      {
        model: models.Competitor,
        through: {attributes: []},
        include: [ 
          models.User, 
          {
            model: models.Score,
            where: { problemId : problemIds }
          }
        ]
      },
    ] 
  })
  return category[0];
}


// it will include competitors in each category and their total scores
// return 
//  - Array<Object> 
const withTotalScores = async (categoryId) => {

  // only accept a number corresponding to an id of a category
  if (typeof categoryId !== 'number'){
    throw new Error('Expect an integer as argument')
  }

  const category = await withScores(categoryId);
  const {competitors, ...result} = category.get({plain: true});

  const newCompetitors = competitors.map(competitor => {
    const {scores, ...result} = competitor;
    result.totalScore = totalScore.fromScores(scores);
    return result;
  })

  result.competitors = newCompetitors;
  return result;
}

module.exports = {
  withScores,
  withTotalScores
}