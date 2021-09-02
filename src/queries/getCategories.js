const models = require('../models');
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

// get all categories associated with this problemId 
// argument : problemId
// return 
//  - Array<int> 
const idsByProblemId = async (problemId) => {
  const categoryIds = await models.ProblemAssignment.findAll({
    where : { problemId : problemId },
    attributes: ['categoryId']
  })
  const result = categoryIds.map(({ categoryId }) => categoryId )
  return result;
} 



// filter the courses according to some filters and return ids
// return Array<int>
const getFilteredIds = async (rawFilter) => {
  const totalScoreFilter = rawFilter.competitor_id 
    ? { competitorId: rawFilter.competitor_id }
    : {};
  const categories = await models.Category.findAll({
    attributes: ["id"],
    include: [
      {
        model: models.TotalScore,
        where: totalScoreFilter
      }
    ]
  })
  return categories.map(({ id }) => id);
}

// get all courses filtered by filter
const all = async (rawFilter) => {
  const ids = await getFilteredIds(rawFilter);
  const result = await models.Category.findAll({
    where: { id: ids }
  });
  return result;
}




module.exports = {
  all,
  withTotalScores,
  idsByProblemId
}