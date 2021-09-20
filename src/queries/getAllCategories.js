const models = require('../models');
const idFilterFactory = require('./idFilter');

const acceptedKeys = ['id', 'event_id'];
const assocModels = {
  competed_by: { model: models.TotalScore, field: 'competitorId' },
  problem_id: { model: models.ProblemAssignment, field: 'problemId' },
};

/// by total scores ? not sure

const getAllCategoriesWithFilter = async (rawFilter) => {
  const idFilter = idFilterFactory(
    models.Category,
    acceptedKeys,
    assocModels,
  );
  const ids = await idFilter.getIds(rawFilter);
  const result = await models.Category.findAll({
    where: { id: ids },
  });
  return result;
};

//-------------------------------------
// get all events with basic details
// return
//  - Array<Event>
const getAllCategories = async (rawFilter) => {
  if (rawFilter) {
    const result = await getAllCategoriesWithFilter(rawFilter);
    return result;
  }
  const result = await models.Category.findAll();
  return result;
};

module.exports = getAllCategories;
