const models = require('../../models');

const data = [
  {
    name: "M1",
    eventId: 1
  },
  {
    name: "F1",
    eventId: 1
  },
  {
    name: "FM1",
    eventId: 1
  },
  {
    name: "M1",
    eventId: 2
  },
  {
    name :"F1",
    eventId: 2
  },
  {
    name: "FM1",
    eventId: 2
  }
]

const seedProblem = () => models.Problem.bulkCreate(data);


module.exports = seedProblem;