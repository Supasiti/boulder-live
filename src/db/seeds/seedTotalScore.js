const models = require('../../models');

const data = [
  {
    competitorId: 1,
    categoryId: 1,
    tops: 2,
    bonuses: 2,
    attemptTop: 2,
    attemptBonus : 2,
    attempts : 2
  },
  {
    competitorId: 2,
    categoryId: 1,
    tops: 1,
    bonuses: 2,
    attemptTop: 4,
    attemptBonus : 3,
    attempts : 7
  },
  {
    competitorId: 3,
    categoryId: 2,
    tops: 2,
    bonuses: 2,
    attemptTop: 4,
    attemptBonus : 2,
    attempts : 4
  },
  {
    competitorId: 4,
    categoryId: 2,
    tops: 1,
    bonuses: 2,
    attemptTop: 3,
    attemptBonus : 5,
    attempts : 6
  },
  {
    competitorId: 5,
    categoryId: 4,
    tops: 2,
    bonuses: 2,
    attemptTop: 2,
    attemptBonus : 2,
    attempts : 2
  },
  {
    competitorId: 6,
    categoryId: 4,
    tops: 1,
    bonuses: 2,
    attemptTop: 4,
    attemptBonus : 3,
    attempts : 7
  },
  {
    competitorId: 7,
    categoryId: 3,
    tops: 2,
    bonuses: 2,
    attemptTop: 4,
    attemptBonus : 2,
    attempts : 4
  },
  {
    competitorId: 8,
    categoryId: 3,
    tops: 1,
    bonuses: 2,
    attemptTop: 3,
    attemptBonus : 5,
    attempts : 6
  }
]

const seedTotalScore = () => models.TotalScore.bulkCreate(data);

module.exports = seedTotalScore;