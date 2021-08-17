const {
  Category,
  CategoryPool,    // so that the association between competitor and category are established
  Competitor,
  ProblemAssignment,
  Problem } = require('../models');
const utils = require('../utils/arrayUtils');


// get problems filtered by categories
// return 
//  - Array<int>
const idsByCategories = async (categories) => {
  
  const ids = (categories instanceof Array)? categories.map(c => c.id): categories;
  const assignments = await ProblemAssignment.findAll({ 
    attributes: ['problemId'],
    where: {categoryId : ids}
  })
  return assignments.map(a => a.problemId); 
}

// get problems from ids
// return 
//  - Array<Object>
const byIds = async (ids) => {
  const result = await Problem.findAll({where: { id : ids}});
  return result;
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
//  - Array<Object>
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
  const result =  utils.generateSet(...problemArrays); 
  return result;
}

module.exports = {
  idsByCategories,
  idsByCompetitorId,
  byIds,
  byCompetitorId
}