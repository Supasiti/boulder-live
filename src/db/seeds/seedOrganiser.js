const models = require('../../models');

const data = [
  {
    "userId":1,
    "eventId":1
  },
  {
    "userId":2,
    "eventId":2
  }
]

const seedOrganiser = () => models.Organiser.bulkCreate(data);

module.exports = seedOrganiser;