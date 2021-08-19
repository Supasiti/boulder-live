const models = require('../models');
const getEvents = require('../queries/getEvents')


// create a new category
// arguments : { name, start, end, eventId }
// return 
//  - Event
const createOne = async (newCategory) => {
  const categoryData = await models.Category.create(newCategory);
  return categoryData;
}

// create many categories
// arguments : Array of { name, start, end, eventId }
// return 
//  - Array<Category>
const createMany = async (newCategories) => {
  const categoryData = await models.Category.bulkCreate(newCategories);
  return categoryData;
}

// remove an event from id
// return 
//  - int
const remove = async (categoryId) => {
  const categoriesRemoved = await models.Category.destroy({
    where : {id : categoryId }
  })
  return categoriesRemoved;
}

// update an event 
// return 
//  - Category
const update = async (newCategory, categoryId) => {
  const categoriesUpdated = await models.Category.update(newCategory, {
    where: { id: categoryId }
  })
  if (!categoriesUpdated[0]) return null;
  const updatedCategory = await models.Category.findByPk(categoryId);
  return updatedCategory[0];
}



module.exports = {
  createOne,
  createMany,
  update,
  remove
}