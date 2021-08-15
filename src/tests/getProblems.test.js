const getProblems = require('../queries/getProblems');

// by using build instead of create, you don't need to connect to the database
// this should be faster

describe('../src/queries/getProblems',  () => {
  
  describe('idsByCategories', () => {
    it ('should returns a list of problem ids from a list of categories', async () => {
      const input = [{id: 1}];
      const expected = [1,3];
    
      const result = await getProblems.idsByCategories(input);
      expect(result).toEqual(expected);
    })
  })

  describe('idsByCompetitorId', () => {
    it ('should returns a list of problem ids from a competitor id', async () => {
      const input = 1;
      const expected = [1,3];

      const result = await getProblems.idsByCompetitorId(input);
      expect(result).toEqual(expected);
    })
  })

  describe('byCompetitorId', () => {
    it ('should returns a list of problems from a competitor id', async () => {
      const input = 1;
      const expected = ['M1','FM1'];

      const result = await getProblems.byCompetitorId(input);
      expect(result.map(r => r.name)).toEqual(expected);
    })
  })
})