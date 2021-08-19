const problem = require('../services/problemServices');
const sanitize = require('../services/sanitize')
const models = require('../models');

describe('src/services/problemServices', () => {

  // create and remove
  it ('should create a problem and problem assignment', async () => {
    const input = {
      name: "M3",
      categoryIds : [1, 2]
    }

    const createdData = await problem.createOne(input);
    const createdId = (createdData instanceof Array)? createdData[0].problemId : createdData.id;
    const createdProblem = await models.Problem.findByPk(createdId);
    await problem.remove(createdId);
    
    expect(createdProblem.name).toEqual(input.name);

    
  })


  

})