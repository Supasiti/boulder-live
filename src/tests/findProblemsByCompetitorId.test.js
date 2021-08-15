const findProblemsByCompetitorId = require('../queries/findProblemsByCompetitorId');
const categoryPool = require('../models/categoryPool');


// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/queries/findProblemsByCompetitorId',  () => {
  
  it ('should returns a list of problem ids filtered by a competitor', async () => {
    // const mockCategoryPoolData = await categoryPool.build([
    //   {
    //     competitorId: 1,
    //     categoryId: 1
    //   },
    //   {
    //     competitorId: 1,
    //     categoryId: 2
    //   }
    // ]);


    // const mockCategoryPool = jest.spyOn(categoryPool, 'findAll');
    // mockCategoryPool.mockResolvedValue(mockCategoryPoolData)

    await findProblemsByCompetitorId(1).then(console.log)
  })
})