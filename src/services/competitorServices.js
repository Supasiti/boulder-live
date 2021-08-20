const models = require('../models');
const getEvents = require('../queries/getEvents');

//----------------------------------------------------------------------------------------
// CREATE

// get next competitor number
// return - int
const getNextCompetitorNumber = async (eventId) => {
  const competitors = await models.Competitor.findAll({ where : { eventId }});
  const numbers = competitors.map(({ number }) => number);
  const nextAvailableNumber = Math.max(...numbers) + 1;
  return nextAvailableNumber;
}

// get category ids to creat by checking if it is in the event or not
// return - Array<int>
const filterCategoryIdsByEvent = async (eventId, newCategoryIds) => {
  const events = await getEvents.byIds(eventId);
  if (!events.length) return [];
  if (!events[0].categories.length) return [];
  const categoryIdsInEvent = events[0].categories.map(({ id }) => id);
  const result = newCategoryIds.filter((id) => categoryIdsInEvent.includes(id));
  return result;
}

// return an array of data object to create category pool
// return Array<Object>
const getCategoryPoolToCreate = (categoryIds, competitorId) => {
  const result = categoryIds.map((categoryId) => {
    return { competitorId, categoryId }
  })
  return result;
}

// create category pools
// return - Array<CategoryPool>
const createCategoryPools = async (competitor, categoryIds) => {
  const { eventId } = competitor;
  const categoryIdsToCreate = await filterCategoryIdsByEvent(eventId, categoryIds);
  
  if (!categoryIdsToCreate.length) return 
  const categoryPoolsToCreate = getCategoryPoolToCreate(categoryIdsToCreate, competitor.id);
  const newCategoryPools = await models.CategoryPool.bulkCreate(categoryPoolsToCreate);
  return newCategoryPools;
}

// create a new competitor
// arguments : {userId, eventId, categoryIds?}
// return 
//  - Competitor 
const create = async (newCompetitor) => {
  if (!('userId' in newCompetitor) || !('eventId' in newCompetitor)) {
    throw new Error('userId and eventId are required to create a competitor.')
  }

  const { eventId } = newCompetitor;
  const number = await getNextCompetitorNumber(eventId);
  const competitorData = { ...newCompetitor, number }
  const competitor = await models.Competitor.create(competitorData);
  
  if ( 'categoryIds' in newCompetitor) {
    const { categoryIds } = newCompetitor;
    if (categoryIds.length){
      await createCategoryPools(competitor, categoryIds);
    }
  }
  return competitor;
}

//----------------------------------------------------------------------------------------
// DELETE

// remove a competitor from id
// return 
//  - int
const remove = async (competitorId) => {
  const competitorRemoved = await models.Competitor.destroy({
    where : {id : competitorId }
  })
  return competitorRemoved;
}

//----------------------------------------------------------------------------------------
// UPDATE


const getCategoryPoolIdsToRemove = (oldCategoryPools, newCategoryIds) => {
  const result = oldCategoryPools
    .filter(({ categoryId }) => !newCategoryIds.includes(categoryId) )
    .map(({ id }) => id)
  return result;
}


// update all associated category pools
// return - Array<CategoryPool>
const updateCategoryPools = async (updatedCompetitor, newCategoryIds) => {
  const { id, eventId } = updatedCompetitor;
  const filteredCategoryIds = await filterCategoryIdsByEvent(eventId, newCategoryIds)
  console.log(filteredCategoryIds);
  if (!filteredCategoryIds.length) return

  const oldCategoryPools = await models.CategoryPool.findAll({ where : { competitorId: id } });
  const oldCategoryIds = oldCategoryPools.map(({ categoryId }) => categoryId);
  const categoryPoolIdsToRemove = getCategoryPoolIdsToRemove(oldCategoryPools, filteredCategoryIds) 
  
  const categoryIdsToCreate = filteredCategoryIds.filter((id) => !oldCategoryIds.includes(id));
  console.log(categoryIdsToCreate);
  const categoryPoolsToCreate = getCategoryPoolToCreate(categoryIdsToCreate, id)

  const categoryPoolsRemoved = await models.CategoryPool.destroy({ where: { id : categoryPoolIdsToRemove }});
  const newCategoryPools = await models.CategoryPool.bulkCreate(categoryPoolsToCreate)

  return newCategoryPools;
}


// update a competitor from id
// expect  : { competitorId, new data }
// return 
//  - Competitor
const update = async (newCompetitor) => {
  if (!('competitorId' in newCompetitor)) {
    throw new Error('competitorId is required to update a competitor.')
  }
  const { competitorId } = newCompetitor;
  const competitorsUpdated = await models.Competitor.update(newCompetitor, {
    where : { id : competitorId }
  }) 
  const updatedCompetitor = await models.Competitor.findByPk(competitorId);

  if ('categoryIds' in newCompetitor){
    const { categoryIds } = newCompetitor;
    if (categoryIds.length){
      console.log('update category pool')
      await updateCategoryPools(updatedCompetitor, categoryIds);
    }
  }
  return updatedCompetitor;
}




module.exports = {
  create,
  remove,
  update
}