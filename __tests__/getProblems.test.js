const getProblems = require('../queries/getProblems');
const sanitize = require('../services/sanitize');


describe('../src/queries/getProblems',  () => {

  describe('byCompetitorId', () => {
    it ('should returns a list of problems from a competitor id', async () => {
      const input = 1;
      const expected = ['M1','FM1'];

      const result = await getProblems.byCompetitorId(input);
      
      expect(result.map(r => r.name))
        .toEqual(expect.arrayContaining(expected));
    })
  })
})