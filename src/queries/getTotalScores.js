const { Op } = require('sequelize');
const models = require('../models');
const getAllCategories = require('./getAllCategories');

// get associated total scores with score
// arguments : score
// return - Array<TotalScore>
const byScore = async (score) => {
  const { competitorId, problemId } = score;
  const categoryIds = await getAllCategories({
    problem_id: problemId,
  });
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
  const result = await models.Category.findAll({
    where: { eventId: eventId },
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
  });

  return result;
};

module.exports = {
  byScore,
  byEvent,
};
