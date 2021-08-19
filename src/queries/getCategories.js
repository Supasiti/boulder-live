const models = require('../models');
const totalScore = require('../services/totalScore');
const sanitize = require('../services/sanitize');

// get problem ids related to a category
// return 
//  - Array<int> 
const getProblemsInCategory = async (categoryId) => {
  const assignments = await models.ProblemAssignment.findAll({
    where : { categoryId: categoryId }
  })
  const problemIds = assignments.map(({ problemId }) => problemId );
  return problemIds
}

const getWithScoresQueryObject = (categoryId, problemIds) => {
  return {
    where : { id: categoryId },
    include : [{
      model: models.Competitor,
      through: {attributes: []},
      include: [ 
        models.User, 
        {
          model: models.Score,
          where: { problemId : problemIds }
        }
      ]
    }] 
  }
} 


// it will include competitors in each category and their scores
// return 
//  - Array<Category> 
const withScores = async (categoryId) => {
  if (typeof categoryId !== 'number') throw new Error('Expect an integer as argument')
    
  const problemIds = await getProblemsInCategory(categoryId);
  const withCompetitorsAndScores = getWithScoresQueryObject(categoryId, problemIds)
  const category = await models.Category.findAll(withCompetitorsAndScores)
  return category[0];
}

// it will include competitors in each category and their total scores
// return 
//  - Array<Object> 
const withTotalScores = async (categoryId) => {
  if (typeof categoryId !== 'number') throw new Error('Expect an integer as argument')
  
  const category = await withScores(categoryId);
  const {competitors, ...result} = sanitize(category);

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