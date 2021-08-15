const category = require('../models/category');
const categoryPool = require('../models/categoryPool'); // so that the association between competitor and category are established
const competitor = require('../models/competitor');
const problemAssignment =require('../models/problemAssignment');
const problem = require('../models/problem');


//  get categories that a competitor enrolled
const getCategoriesEnrolledByCompetitor = async (competitorId) => {
  const aCompetitor = await competitor.findByPk(
    competitorId,
    { include: category.getModel()}
  )
  return aCompetitor.categories; // [category]
}

// get problems filtered by categories
const idsByCategories = async (categories) => {
  const ids = categories.map(c => c.id);
  const assignments = await problemAssignment.findAll({ 
    attributes: ['problemId'],
    where: {categoryId : ids}
  })
  return assignments.map(a => a.problemId); // [ 1, 2,...]
}

// get problems from ids
const byIds = async (ids) => {
  return await problem.findAll({where: { id : ids}}); // [problem]
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