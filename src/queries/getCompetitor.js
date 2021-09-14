const models = require('../models');

// return a competitor
// argument: {userId, eventId}
const getCompetitor = async (data) => {
  const result = await models.Competitor.findOne({
    where: { userId: data.userId, eventId: data.eventId },
    include: [
      {
        model: models.TotalScore,
        attributes: ['categoryId'],
      },
      {
        model: models.Score,
      },
    ],
  });
  return result;
};

module.exports = getCompetitor;
