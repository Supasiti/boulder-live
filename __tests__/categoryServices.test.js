const models = require('../models')
const category = require('../services/categoryServices')
const sanitize = require('../services/sanitize')

describe('src/services/categoryServices', () => {

  // create and remove
  it ('should create a category and orgniser', async () => {
    const input = {
      eventId: 1,
      name: "Dyno Fiend"
    }

    const categoryData = await category.createOne(input);
    const resultCategory = await models.Category.findByPk(categoryData.id);
    await category.remove(categoryData.id);

    expect(resultCategory.name).toEqual(input.name);

  })


  // update 
  describe('update', () => { 
    it('should return a new category', async () => {

      const firstInput  = {
        eventId: 1,
        name: "Dyno Fiend"
      }
      const secondInput = { name: "Balance" }

      const createdData = await category.createOne(firstInput);
      const updatedData = await category.update(secondInput, createdData.id);
      const rowsRemoved = await category.remove(createdData.id);

      expect(updatedData.name).toEqual(secondInput.name);
    })
  })

})