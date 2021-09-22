const models = require('../models');
const scoreServices = require('./scoreServices');
const totalScoreServices = require('./totalScoreServices');
const _ = require('../utils/arrayUtils');

// create a new category / many
// arguments : { name, eventId }
// return
//  - Category
const create = async ({ name, eventId }) => {
  const data = { name, event: eventId };
  const result = await models.Category.create(data);
  return result;
};

// remove a category
// return
//  - int
const remove = async (categoryId) => {
  const result = await models.Category.findByIdAndDelete(categoryId);
  return result;
};

// update an event
// return
//  - Category
// const update = async (newCategory, categoryId) => {
//   const categoriesUpdated = await models.Category.update(
//     newCategory,
//     {
//       where: { id: categoryId },
//     },
//   );
//   if (!categoriesUpdated[0]) return null;
//   const updatedCategory = await models.Category.findByPk(categoryId);
//   return updatedCategory;
// };

// assign a category Model with problem id
// return Promise
const assignProblems = (category, assignments) => {
  const categoryId = category._id.toString();
  const problems = _.filterByKey(
    assignments,
    'categoryId',
    categoryId,
  );
  category.problems = _.mapToKey(problems, 'problemId');
  return category.save();
};

// assign problems to each category in an event
// expect: {assignments: Array<{problemId, categoryId}>, eventId}
// assume that this will be all the assignments
const assign = async ({ eventId, assignments }) => {
  const categories = await models.Category.find({
    event: eventId,
  }).catch(console.error);
  const promises = categories.map((category) =>
    assignProblems(category, assignments),
  );
  const result = await Promise.all(promises);
  return result;
};

//-----------------------------------------------------------
// let a competitor join in a category

const isEventCategory = (event, categoryId) => {
  const categoryIds = event.categories.map((c) => c.toString());
  return categoryIds.includes(categoryId);
};

// check if the competitor is in the same event as category
// and check if a competitor already joined
const validateCompetitor = (competitor, newCategoryId) => {
  return (
    isEventCategory(competitor.event, newCategoryId) &&
    !competitor.categories.includes(newCategoryId)
  );
};

const getCompetitor = async (competitorId) => {
  const result = await models.Competitor.findById(competitorId)
    .populate({
      path: 'event',
      select: 'categories',
    })
    .populate('scores')
    .catch((err) => console.error(err));
  return result;
};

// argument: { competitorId, categoryId }
// return true if it is successful
const join = async (data) => {
  const { competitorId, categoryId } = data;
  const competitor = await getCompetitor(competitorId);
  const isValid = validateCompetitor(competitor, categoryId);
  if (!isValid) return false;

  competitor.categories = [...competitor.categories, categoryId];
  const scorePromise = scoreServices.generate(competitor, categoryId);
  const totalPromise = totalScoreServices.create(
    competitor,
    categoryId,
  );
  await Promise.all([scorePromise, totalPromise]);
  return true;
};

module.exports = {
  create,
  // update,
  remove,
  join,
  assign,
};
