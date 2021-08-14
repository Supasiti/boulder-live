const sequelize = require('../configs/sequelizeConnection');
require('../services/initTables');
const category = require('../models/category')

describe('../src/models/category', () => {

  // need to set up model each time
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  it('should throw when the end date time is before the start date',  () => {

    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 24, 0),
      end: new Date(2021, 7, 17, 3, 0, 0)
    }

      const result = category.create(input);
      expect(result).rejects.toThrow();
  })

  it('should return a promise when all paramaters are entered', async () => {
    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 0, 0),
      end: new Date(2021, 7, 17, 3, 24, 0)
    }
    const result = await category.create(input).catch(console.error);
    expect(result.name).toEqual('Boulder Cup');
  })


  // need to tear model connection each time
  afterAll(async () => {
    await category.remove({
      where : { 
        name : 'Boulder Cup'
      }
    });
    await sequelize.close()
  })

})