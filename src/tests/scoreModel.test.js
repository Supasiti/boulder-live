require('../services/initTables')
const score = require('../models/score');
const seedDatabase = require('../seeds/seedDatabase');

// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/models/score', () => {
  
  // validation constraints
  describe('validation', ()=> {
    const testConditions = [
      { // top without bonus
        competitorId: 1,
        problemId: 1,
        top: true,
        bonus: false,
        attemptTop: 0,
        attemptBonus:0,
        attempts: 0
      },
      { // top without attempt top
        competitorId: 1,
        problemId: 1,
        top: true,
        bonus: true,
        attemptTop: 0,
        attemptBonus:0,
        attempts: 0
      },
      { // no top but have attempt top
        competitorId: 1,
        problemId: 1,
        top: false,
        bonus: true,
        attemptTop: 1,
        attemptBonus:0,
        attempts: 0
      },
      { // no bonus but have attempt bonus
        competitorId: 1,
        problemId: 1,
        top: false,
        bonus: false,
        attemptTop: 0,
        attemptBonus:1,
        attempts: 0
      },
      { // bonus but have no attempt bonus
        competitorId: 1,
        problemId: 1,
        top: false,
        bonus: true,
        attemptTop: 0,
        attemptBonus:0,
        attempts: 0
      },
      { // attempts is smaller than max (attemptTop and attemptBonus)
        competitorId: 1,
        problemId: 1,
        top: true,
        bonus: true,
        attemptTop: 4,
        attemptBonus: 3,
        attempts: 1
      },
    ]
  
    test.each(testConditions)('On input of %j, it should throw an error ', (input) => {
      const result = score.build(input);
      expect(result.validate()).rejects.toThrow();
    })
  })

})

