const models = require('../../models');

const data = [
  {
    name: "M1",
    event_id: 1
  },
  {
    name: "F1",
    event_id: 1
  },
  {
    name: "FM1",
    event_id: 1
  },
  {
    name: "M1",
    event_id: 2
  },
  {
    name :"F1",
    event_id: 2
  },
  {
    name: "FM1",
    event_id: 2
  }
]

const seedProblem = () => models.Problem.bulkCreate(data);


module.exports = seedProblem;