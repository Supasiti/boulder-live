const sequelize = require('../configs/sequelizeConnection');
const User = require('../models/UserDb')


describe('../src/models/UserDb', () => {

  // need to set up model each time
  beforeAll(async () => {
    await sequelize.sync({force: false })
  })

  it('should throw when missing a paramater', () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com'
    }
    const result = User.create(input);
    expect(result).rejects.toThrow();
  })

  it('should return a promise when all paramaters are entered', async () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com',
      password: 'asdfjlasdf;asdf'
    }

    const result = await User.create(input).catch(console.error);
    expect(result.username).toEqual('Bob');
  })


  // need to tear model connection each time
  afterAll(async () => {
    await User.destroy({where: {username:'bob'}});
    await sequelize.close()
  })
})


