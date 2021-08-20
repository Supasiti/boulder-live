const competitor = require('../services/competitorServices');
const sanitize = require('../services/sanitize')
const models = require('../models');

describe('src/services/competitorServices', () => {

  // create and remove
  describe('create and remove', () => {
    it ('should create a competior with unique number and category pool', async () => {
      const input = {
        userId: 6,
        eventId: 1,
        categoryIds : [1]
      }

      const createdData = await competitor.create(input);
      await competitor.remove(createdData.id);
      
      expect(createdData.userId).toEqual(input.userId);
    })
  })
  
  // update
  describe('update', () => {
    it ('should create a competior with unique number and category pool', async () => {
      const firstInput = {
        userId: 6,
        eventId: 1,
        categoryIds : [1]
      }
      const { id } = await competitor.create(firstInput);
      const secondInput = {
        competitorId: id,
        userId: 6,
        eventId: 1,
        categoryIds : [1, 2]
      }
      const updatedData = await competitor.update(secondInput);
      const categoryPools = await models.CategoryPool.findAll({
        where : { competitorId : id}
      })
      const resultCategoryIds = categoryPools.map(({ categoryId }) => categoryId)
      await competitor.remove(id);
      
      expect(updatedData.userId).toEqual(secondInput.userId);
      expect(resultCategoryIds)
        .toEqual(expect.arrayContaining(secondInput.categoryIds))
    })
  })

  
  
  

})