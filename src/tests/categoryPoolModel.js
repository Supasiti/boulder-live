const sequelize = require('../configs/sequelizeConnection');
require('../services/initTables')
const categoryPool = require('../models/categoryPool');
const seedDatabase = require('../seeds/seedDatabase');

// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/models/categoryPool', () => {
  
  describe('create/build', () => {
    it('should throw if the competitor is not part of same event as the category', async ()=>{

      await sequelize.sync({force: true});
      await seedDatabase();

      const input = {
        competitorId: 1,
        categoryId: 3
      }

      expect(categoryPool.build(input)).rejects.toThrow();      
      await sequelize.close();
    })
  })
  

})