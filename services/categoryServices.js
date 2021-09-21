const models = require('../models');
const query = require('../queries');
// const scoreServices = require('./scoreServices');

// create a new category / many
// arguments : { name, eventId }
// return
//  - Category
const create = async (newCategory) => {
  const result = await models.Category.create(newCategory);
  models.Event.findByIdAndUpdate(newCategory.eventId, {
    $push: { categories: result._id },
  });
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

// assign problems to each category in an event
// expect: {assignments: Array<{problemId, categoryId}>, eventId}
// assume that this will be all the assignments
const assign = async (data) => {
  const { eventId, assignments } = data;
  const { categories } = await models.Event.findById(eventId)
    .select('categories')
    .populate('categories')
    .catch(console.error);
  const promises = categories.map((category) => {
    const categoryId = category._id.toString();
    console.log(categoryId);
    const newProblems = assignments.filter(
      (a) => a.categoryId === categoryId,
    );
    category.problems = newProblems.map(({ problemId }) => problemId);
    return category.save();
  });
  const result = await Promise.all(promises);
  return result;
};

//-----------------------------------------------------------
// let a competitor join in a category

// check if the competitor is in the same event as category
// and check if a competitor already joined
// const validateCompetitor = async ({ competitorId, categoryId }) => {
//   const totalScorePromise = models.TotalScore.findOne({
//     where: { competitorId, categoryId },
//   });
//   const competitorPromise = models.Competitor.findByPk(competitorId);
//   const categoryPromise = models.Category.findByPk(categoryId);
//   const [competitor, category, totalScore] = await Promise.all([
//     competitorPromise,
//     categoryPromise,
//     totalScorePromise,
//   ]);
//   return category.eventId === competitor.eventId || totalScore;
// };

// argument: { competitorId, categoryId }
// return true if it is successful
// const join = async (data) => {
//   const isValid = await validateCompetitor(data);
//   if (!isValid) return false;
//   const newTotalScore = await models.TotalScore.create(data); // create total score
//   await scoreServices.generate(newTotalScore);
//   return true;
// };

module.exports = {
  create,
  // update,
  remove,
  // join,
  assign,
};
