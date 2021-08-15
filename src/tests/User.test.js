const sequelize = require('../configs/sequelizeConnection');
require('../services/initTables')
const user = require('../models/user');

// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/models/user', () => {

  it('should throw when missing a paramater', () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com'
    }
    const result = user.build(input);
    expect(result.validate()).rejects.toThrow();
  })

  it('should return a promise when all paramaters are entered',  () => {
    const input = {
      username: 'Bob',
      email: 'bob@email.com',
      password: 'asdfjlasdf;asdf'
    }

    const result = user.build(input)
    expect(result.email).toEqual('bob@email.com');
  })
})


