const models = require('../models');

// return a competitor 
// argument: {userId, eventId}
const one = async (data) => {
  const result = await models.Competitor.findOne({
    where : { userId: data.userId, eventId: data.eventId }
  })
  return result;
} 

module.exports = {
  one
}