const models = require('../models');

const data = [
  {
    "userId": 2,
    "eventId": 1,
    "number": 1,
    "status": "approved"
  },
  {
    "userId": 3,
    "eventId": 1,
    "number": 2,
    "status": "approved"
  },
  {
    "userId": 4,
    "eventId": 1,
    "number": 3,
    "status": "approved"
  },
  {
    "userId": 5,
    "eventId": 1,
    "number": 4,
    "status": "approved"
  },
  {
    "userId": 5,
    "eventId": 2,
    "number": 1,
    "status": "approved"
  },
  {
    "userId": 6,
    "eventId": 2,
    "number": 2,
    "status": "approved"
  },
  {
    "userId": 7,
    "eventId": 2,
    "number": 3,
    "status": "approved"
  },
  {
    "userId": 8,
    "eventId": 2,
    "number": 4,
    "status": "approved"
  }
]

const seedCompetitor =  () => models.Competitor.bulkCreate(data);

module.exports = seedCompetitor;