const models = require('../models');

const data = [
  {
    "categoryId": 1,
    "problemId": 1
  },
  {
    "categoryId": 1,
    "problemId": 3
  },
  {
    "categoryId": 2,
    "problemId": 2
  },
  {
    "categoryId": 2,
    "problemId": 3
  },
  {
    "categoryId": 3,
    "problemId": 4
  },
  {
    "categoryId": 3,
    "problemId": 6
  },
  {
    "categoryId": 4,
    "problemId": 5
  },
  {
    "categoryId": 4,
    "problemId": 6
  }
]

const seedProblemAssignment = () => models.ProblemAssignment.bulkCreate(data);


module.exports = seedProblemAssignment;