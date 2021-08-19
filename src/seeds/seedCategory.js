const models = require('../models');

const data = [
  {
    name: "Male",
    eventId: 1
  },
  {
    name: "Female",
    eventId: 1
  },
  {
    name: "Male",
    eventId: 2
  },
  {
    name: "Female",
    eventId: 2
  }
]

const seedCategory = () => models.Category.bulkCreate(data)

module.exports = seedCategory;