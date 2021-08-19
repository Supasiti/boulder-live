const models = require('../models');

const data = [
  {
    competitorId: 1,
    categoryId: 1
  },
  {
    competitorId: 2,
    categoryId: 1
  },
  {
    competitorId: 3,
    categoryId: 2
  },
  {
    competitorId: 4,
    categoryId: 2
  },
  {
    competitorId: 5,
    categoryId: 4
  },
  {
    competitorId: 6,
    categoryId: 4
  },
  {
    competitorId: 7,
    categoryId: 3
  },
  {
    competitorId: 8,
    categoryId: 3
  }
]

const seedCategoryPool = () => models.CategoryPool.bulkCreate(data);

module.exports = seedCategoryPool;