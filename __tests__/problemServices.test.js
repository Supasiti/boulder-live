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
    await problem.remove(createdData.id);
    
    expect(createdData.name).toEqual(input.name);
  })

  
  // create and remove
  it ('should create problems', async () => {
    const input = [
      {
        name: "M3",
        categoryIds : [1, 2]
      },
      {
        name: "M4",
        categoryIds : [1, 2]
      }
    ]

    const createdData = await problem.createMany(input);
    const createdIds = createdData.map(({ id }) => id); 
    await Promise.all(
      createdIds.map( (id) => { return problem.remove(id) })
    )

    expect(createdData.map(({ name }) => name))
      .toEqual(expect.arrayContaining(input.map(({ name }) => name)));
  })



  // update
  it ('should update problem', async () => {
    const firstInput = {
      name: "M3",
      categoryIds : [1, 2]
    }
    const { id } = await problem.createOne(firstInput);
    const secondInput = {
      problemId: id,
      name: "M4",
      categoryIds : [2, 3]
    }
    const updatedProblem = await problem.update(secondInput);
    await problem.remove(updatedProblem.id)
  
    expect(updatedProblem.name).toEqual(secondInput.name);
  })
  

})