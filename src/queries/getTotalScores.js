const { Op } = require('sequelize');
const models = require('../models');
const getCategories = require('./getCategories');

// get associated total scores with score
// arguments : score
// return - Array<TotalScore>
const byScore = async (score) => {
  const { competitorId, problemId } = score;
  const categoryIds = await getCategories.idsByProblemId(problemId);
  const totalScores = await models.TotalScore.findAll({
    where: {
      [Op.and]: [{ competitorId }, { categoryId: categoryIds }],
    },
  });
  return totalScores;
};

// get all total scores from an event organised by categories
// arguments : eventId
// return -  Event
const byEvent = async (eventId) => {
  const result = await models.Event.findOne({
    where: { id: eventId },
    include: [
      {
        model: models.Category,
        include: [
          {
            model: models.TotalScore,
            order: [
              ['tops', 'DESC'],
              ['bonuses', 'DESC'],
              ['attemptTop', 'ASC'],
              ['attemptBonus', 'ASC'],
            ],
            include: {
              model: models.Competitor,
              include: {
                model: models.User,
                attributes: ['username'],
              },
            },
          },
        ],
      },
    ],
  });

  return result;
};

module.exports = {
  byScore,
  byEvent,
};
