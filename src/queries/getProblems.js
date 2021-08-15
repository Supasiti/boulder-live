const Category = require('../models/Category');
const CategoryPool = require('../models/CategoryPool'); // so that the association between competitor and category are established
const Competitor = require('../models/Competitor');
const ProblemAssignment = require('../models/ProblemAssignment');
const Problem = require('../models/Problem');
const utils = require('../utils/arrayUtils');


// get problems filtered by categories
// return 
//  - Array<int>
const idsByCategories = async (categories) => {
  const ids = categories.map(c => c.id);
  const assignments = await ProblemAssignment.findAll({ 
    attributes: ['problemId'],
    where: {categoryId : ids}
  })
  return assignments.map(a => a.problemId); 
}

// get problems from ids
// return 
//  - Array<Problem>
const byIds = async (ids) => {
  return await Problem.findAll({where: { id : ids}}); 
}

// get all the problem id that a competitor need to do
// return 
//  - Array<int>
const idsByCompetitorId = async (competitorId) => {
  const problems = await byCompetitorId(competitorId);
  return problems.map(p => p.id);  
}

// get all the problems that a competitor to compete
// return 
//  - Array<Problem>
const byCompetitorId = async (competitorId) => {
  const competitor = await Competitor.findByPk(
    competitorId,
    { 
      include: 
      {
        model: Category,
        include: Problem
      }
    }
  )
  const problemArrays = competitor.categories.map(c => c.problems);
  return utils.generateSet(...problemArrays); 

}

module.exports = {
  idsByCategories,
  idsByCompetitorId,
  byIds,
  byCompetitorId
}