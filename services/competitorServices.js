const models = require('../models');
const _ = require('../utils/arrayUtils');

//--------------------------------------------------------------------
// CREATE - good

// get next competitor number
// return - int
const getNextCompetitorNumber = async (eventId) => {
  const competitors = await models.Competitor.find({
    event: eventId,
  });
  if (!competitors.length) return 1;
  const numbers = _.mapToKey(competitors, 'number');
  const nextAvailableNumber = Math.max(...numbers) + 1;
  return nextAvailableNumber;
};

// create a new competitor
// arguments : {userId, eventId}
// return
//  - Competitor
const create = async ({ eventId, userId }) => {
  const number = await getNextCompetitorNumber(eventId);
  const competitorData = { user: userId, event: eventId, number };
  const result = await models.Competitor.create(competitorData);
  return result;
};

//--------------------------------------------------------------------
// DELETE - good

// remove a competitor from id
// return
//  - int
const remove = async (competitorId) => {
  const competitorRemoved = await models.Competitor.destroy({
    where: { id: competitorId },
  });
  return competitorRemoved;
};

module.exports = {
  remove,
  create,
};
