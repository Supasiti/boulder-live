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

const inSameEvent = (competitor, category) => {
  const result =
    competitor.event.toString() === category.event.toString();
  return result;
};

const alreadyJoined = (competitor, category) => {
  const categoryIdStr = competitor.categories.map((c) =>
    c.toString(),
  );
  const result = categoryIdStr.includes(category._id.toString());
  return result;
};

// check if the competitor is in the same event as category
// and check if a competitor already joined
const validateCompetitor = (competitor, category) =>
  inSameEvent(competitor, category) &&
  !alreadyJoined(competitor, category);

const getData = async ({ competitorId, categoryId }) => {
  const promises = [];
  promises.push(
    models.Competitor.findById(competitorId)
      .populate('scores')
      .catch(console.error),
  );
  promises.push(
    models.Category.findById(categoryId).catch(console.error),
  );
  const [competitor, category] = await Promise.all(promises);
  return { competitor, category };
};

const createScores = async (competitor, category) => {
  competitor.categories = [...competitor.categories, category._id];

  const promises = [];
  promises.push(totalScoreServices.create(competitor, category));
  promises.push(scoreServices.generate(competitor, category));
  promises.push(competitor.save());
  const [totalScore, ...other] = await Promise.all(promises);
  return totalScore;
};

// argument: { competitorId, categoryId }
// return true if it is successful
const join = async (data) => {
  const { competitor, category } = await getData(data);
  const isValid = validateCompetitor(competitor, category);
  if (!isValid) return false;

  const totalScore = await createScores(competitor, category);
  if (totalScore) {
    await scoreServices.addRefToTotal(
      competitor,
      category,
      totalScore,
    );
  }
  return true;
};

module.exports = {
  create,
  // update,
  remove,
  join,
  assign,
};
