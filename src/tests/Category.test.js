require('../services/initTables');
const Category = require('../models/Category')

// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/models/Category', () => {

  it('should throw when a start date time is not entered',  () => {
    const input = {
      name: 'Boulder Cup',
      end: new Date(2021, 7, 17, 3, 0, 0)
    }

    const result = Category.build(input);
    expect(result.validate()).rejects.toThrow();
  })

  it('should throw when the end date time is before the start date',  () => {
    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 24, 0),
      end: new Date(2021, 7, 17, 3, 0, 0)
    }

    const result = Category.build(input);
    expect(result.validate()).rejects.toThrow();
  })

  it('should return a model when all paramaters are entered',  () => {
    const input = {
      name: 'Boulder Cup',
      start: new Date(2021, 7, 17, 3, 0, 0),
      end: new Date(2021, 7, 17, 3, 24, 0)
    }
    const result = Category.build(input)
    expect(result.name).toEqual('Boulder Cup');
  })

})