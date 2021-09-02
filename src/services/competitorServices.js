const models = require('../models');
const getEvents = require('../queries/getEvents');

//----------------------------------------------------------------------------------------
// CREATE

// get next competitor number
// return - int
const getNextCompetitorNumber = async (eventId) => {
  const competitors = await models.Competitor.findAll({ where : { eventId }});
  if (!competitors.length) return 1;
  const numbers = competitors.map(({ number }) => number);
  const nextAvailableNumber = Math.max(...numbers) + 1;
  return nextAvailableNumber;
}

// create a new competitor
// arguments : {userId, eventId}
// return 
//  - Competitor 
const create = async (newCompetitor) => {
  if (!('userId' in newCompetitor) || !('eventId' in newCompetitor)) {
    throw new Error('userId and eventId are required to create a competitor.')
  }

  const { eventId } = newCompetitor;
  const number = await getNextCompetitorNumber(eventId);
  const competitorData = { ...newCompetitor, number }
  const result = await models.Competitor.create(competitorData);
  return result;
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
const getTotalScoresToCreate = (categoryIds, competitorId) => {
  const result = categoryIds.map((categoryId) => {
    return { competitorId, categoryId }
  })
  return result;
}

const getTotalScoreIdsToRemove = (oldTotalScores, newCategoryIds) => {
  const result = oldTotalScores
    .filter(({ categoryId }) => !newCategoryIds.includes(categoryId) )
    .map(({ id }) => id)
  return result;
}


// update all associated TotalScore
// return - Array<TotalScore>
const updateTotalScores = async (updatedCompetitor, newCategoryIds) => {
  const { id, eventId } = updatedCompetitor;
  const filteredCategoryIds = await filterCategoryIdsByEvent(eventId, newCategoryIds)
  if (!filteredCategoryIds.length) return

  const oldTotalScores = await models.TotalScore.findAll({ where : { competitorId: id } });
  const oldCategoryIds = oldTotalScores.map(({ categoryId }) => categoryId);
  const totalScoreIdsToRemove = getTotalScoreIdsToRemove(oldTotalScores, filteredCategoryIds) 
  
  const categoryIdsToCreate = filteredCategoryIds.filter((id) => !oldCategoryIds.includes(id));
  const totalScoresToCreate = getTotalScoresToCreate(categoryIdsToCreate, id)

  const totalScoresRemoved = await models.TotalScore.destroy({ where: { id : totalScoreIdsToRemove }});
  const newTotalScores = await models.TotalScore.bulkCreate(totalScoresToCreate)

  return newTotalScores;
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
      await updateTotalScores(updatedCompetitor, categoryIds);
    }
  }
  return updatedCompetitor;
} 




module.exports = {
  create,
  remove,
  update
}