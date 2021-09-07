const models = require('../models');
const query = require('../queries');
const scoreServices = require('./scoreServices');
const sanitize = require('../services/sanitize');

// create a new category
// arguments : { name, start, end, eventId }
// return
//  - Event
const createOne = async (newCategory) => {
  const categoryData = await models.Category.create(newCategory);
  return categoryData;
};

// create many categories
// arguments : Array of { name, start, end, eventId }
// return
//  - Array<Category>
const createMany = async (newCategories) => {
  const categoryData = await models.Category.bulkCreate(
    newCategories,
  );
  return categoryData;
};

// combine the two methods above

const create = async (newCategories) => {
  if (newCategories instanceof Array) {
    const result = await createMany(newCategories);
    return result;
  }
  const result = await createOne(newCategories);
  return result;
};

// remove an event from id
// return
//  - int
const remove = async (categoryId) => {
  const categoriesRemoved = await models.Category.destroy({
    where: { id: categoryId },
  });
  return categoriesRemoved;
};

// update an event
// return
//  - Category
const update = async (newCategory, categoryId) => {
  const categoriesUpdated = await models.Category.update(
    newCategory,
    {
      where: { id: categoryId },
    },
  );
  if (!categoriesUpdated[0]) return null;
  const updatedCategory = await models.Category.findByPk(categoryId);
  return updatedCategory;
};

//-----------------------------------------------------------
// let a competitor join in a category

// check if the competitor is in the same event as category
const validateCompetitor = async ({ competitorId, categoryId }) => {
  const competitorPromise = models.Competitor.findByPk(competitorId);
  const categoryPromise = models.Category.findByPk(categoryId);
  const [competitor, category] = await Promise.all([
    competitorPromise,
    categoryPromise,
  ]);
  return category.eventId === competitor.eventId;
};

// argument: { competitorId, categoryId }
// return true if it is successful
const join = async (data) => {
  const isValid = await validateCompetitor(data);
  if (!isValid) return false;
  const newTotalScore = await models.TotalScore.create(data); // create total score
  await scoreServices.generate(newTotalScore);
  return true;
};

module.exports = {
  createOne,
  createMany,
  create,
  update,
  remove,
  join,
};
