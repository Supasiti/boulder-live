const getTotalScores = require('../src/queries/getTotalScores');
const models = require('../src/models/Score')

describe('src/queries/getTotalScores', () => {
  
  describe('byScore', () => {
    it ('should return a list of all total scores associated with this score', async () => {

      const scoreId = 11;
      const input = await models.findByPk(scoreId);
      const expectedIds = [6];
      const expectedLength = 1;

      const result = await getTotalScores.byScore(input);
      const resultIds = result.map(({ id }) => id);

      expect(resultIds).toEqual(expect.arrayContaining(expectedIds));
      expect(result.length).toEqual(expectedLength);
    })
  })
}) 