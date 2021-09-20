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
};
