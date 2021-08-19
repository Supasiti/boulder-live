const models = require('../models');

const data = [
  {
    "categoryPoolId":1,
    "problemId":1,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId":1,
    "problemId":3,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId":2,
    "problemId":1,
    "top":false,
    "bonus": true,
    "attemptTop" : 0,
    "attemptBonus" : 2,
    "attempts" : 3
  },
  {
    "categoryPoolId":2,
    "problemId":3,
    "top":true,
    "bonus": true,
    "attemptTop" : 4,
    "attemptBonus" : 1,
    "attempts" : 4
  },
  {
    "categoryPoolId":3,
    "problemId":2,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId":3,
    "problemId":3,
    "top":true,
    "bonus": true,
    "attemptTop" : 3,
    "attemptBonus" : 1,
    "attempts" : 3
  },
  {
    "categoryPoolId":4,
    "problemId":2,
    "top":false,
    "bonus": true,
    "attemptTop" : 0,
    "attemptBonus" : 3,
    "attempts" : 3
  },
  {
    "categoryPoolId":4,
    "problemId":3,
    "top":true,
    "bonus": true,
    "attemptTop" : 3,
    "attemptBonus" : 2,
    "attempts" : 3
  },
  {
    "categoryPoolId":5,
    "problemId":5,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId": 5,
    "problemId":6,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId":6,
    "problemId":5,
    "top":false,
    "bonus": true,
    "attemptTop" : 0,
    "attemptBonus" : 2,
    "attempts" : 3
  },
  {
    "categoryPoolId":6,
    "problemId":6,
    "top":true,
    "bonus": true,
    "attemptTop" : 4,
    "attemptBonus" : 1,
    "attempts" : 4
  },
  {
    "categoryPoolId":7,
    "problemId":4,
    "top":true,
    "bonus": true,
    "attemptTop" : 1,
    "attemptBonus" : 1,
    "attempts" : 1
  },
  {
    "categoryPoolId":7,
    "problemId":6,
    "top":true,
    "bonus": true,
    "attemptTop" : 3,
    "attemptBonus" : 1,
    "attempts" : 3
  },
  {
    "categoryPoolId":8,
    "problemId":4,
    "top":false,
    "bonus": true,
    "attemptTop" : 0,
    "attemptBonus" : 3,
    "attempts" : 3
  },
  {
    "categoryPoolId":8,
    "problemId":6,
    "top":true,
    "bonus": true,
    "attemptTop" : 3,
    "attemptBonus" : 2,
    "attempts" : 3
  }
]

const seedScore = () => models.Score.bulkCreate(data);

module.exports = seedScore;