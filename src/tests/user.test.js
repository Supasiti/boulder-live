const sequelize = require('../configs/sequelizeConnection');
require('../services/initTables')
const user = require('../models/user');

describe('../src/models/user', () => {

  // need to set up model each time
  beforeAll(async () => {
    await sequelize.sync({force: true })
  })

  it('should throw when missing a paramater', () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com'
    }
    const result = user.create(input);
    expect(result).rejects.toThrow();
  })

  it('should return a promise when all paramaters are entered', async () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com',
      password: 'asdfjlasdf;asdf'
    }

    const result = await user.create(input).catch(console.error);
    expect(result.username).toEqual('Bob');
  })


  // need to tear model connection each time
  afterAll(async () => {
    await user.remove({where: {username:'bob@email.com'}});
    await sequelize.close()
  })
})


