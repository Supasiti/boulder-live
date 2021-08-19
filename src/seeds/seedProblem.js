const models = require('../models');

const data = [
  {
    "name":"M1"
  },
  {
    "name":"F1"
  },
  {
    "name":"FM1"
  },
  {
    "name":"M1"
  },
  {
    "name":"F1"
  },
  {
    "name":"FM1"
  }
]

const seedProblem = () => models.Problem.bulkCreate(data);


module.exports = seedProblem;