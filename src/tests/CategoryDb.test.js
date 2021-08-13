const sequelize = require('../configs/sequelizeConnection');
const Category = require('../models/CategoryDb')


describe('../src/models/CategoryDb', () => {

  // need to set up model each time
  beforeAll(async () => {
    await sequelize.sync({ force: false })
  })

  it('should throw when the end date time is before the start date',  () => {

    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 24, 0),
      end: new Date(2021, 7, 17, 3, 0, 0)
    }

      const result = Category.create(input);
      expect(result).rejects.toThrow();
  })

  it('should return a promise when all paramaters are entered', async () => {
    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 0, 0),
      end: new Date(2021, 7, 17, 3, 24, 0)
    }
    const result = await Category.create(input).catch(console.error);
    expect(result.name).toEqual('Boulder Cup');
  })


  // need to tear model connection each time
  afterAll(async () => {
    await Category.destroy({
      where : { 
        name : 'Boulder Cup'
      }
    });
    await sequelize.close()
  })

})