const models = require('../../models');

const data = [
  {
    "categoryId": 1,
    "problemId": 1,
    eventId: 1
  },
  {
    "categoryId": 1,
    "problemId": 3,
    eventId: 1
  },
  {
    "categoryId": 2,
    "problemId": 2,
    eventId: 1
  },
  {
    "categoryId": 2,
    "problemId": 3,
    eventId: 1
  },
  {
    "categoryId": 3,
    "problemId": 4,
    eventId: 2
  },
  {
    "categoryId": 3,
    "problemId": 6,
    eventId: 2
  },
  {
    "categoryId": 4,
    "problemId": 5,
    eventId: 2
  },
  {
    "categoryId": 4,
    "problemId": 6,
    eventId: 2
  }
]

const seedProblemAssignment = () => models.ProblemAssignment.bulkCreate(data);


module.exports = seedProblemAssignment;