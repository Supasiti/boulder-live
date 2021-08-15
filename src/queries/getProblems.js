const Category = require('../models/Category');
const CategoryPool = require('../models/CategoryPool'); // so that the association between competitor and category are established
const Competitor = require('../models/Competitor');
const ProblemAssignment =require('../models/ProblemAssignment');
const Problem = require('../models/Problem');


//  get categories that a competitor enrolled
const getCategoriesEnrolledByCompetitor = async (competitorId) => {
  const aCompetitor = await Competitor.findByPk(
    competitorId,
    { include: Category}
  )
  return aCompetitor.categories; // [category]
}

// get problems filtered by categories
const idsByCategories = async (categories) => {
  const ids = categories.map(c => c.id);
  const assignments = await ProblemAssignment.findAll({ 
    attributes: ['problemId'],
    where: {categoryId : ids}
  })
  return assignments.map(a => a.problemId); // [ 1, 2,...]
}

// get problems from ids
const byIds = async (ids) => {
  return await Problem.findAll({where: { id : ids}}); // [problem]
}

// get all the problem id that a competitor need to do
const idsByCompetitorId = async (competitorId) => {
  const categoriesEnrolled = await getCategoriesEnrolledByCompetitor(competitorId);
  return await idsByCategories(categoriesEnrolled);  
}

// get all the problems that a competitor to compete
const byCompetitorId = async (competitorId) => {
  const problemIds = await idsByCompetitorId(competitorId);
  return await byIds(problemIds);
}

module.exports = {
  getCategoriesEnrolledByCompetitor,
  idsByCategories,
  idsByCompetitorId,
  byIds,
  byCompetitorId
}