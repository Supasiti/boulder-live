const getCategories = require('../queries/getCategories');
const sanitize = require('../services/sanitize');

describe('src/queries/getCategories', () => {
  
  describe('withScores', () => {
    it ('should return a list of one category, each with competitors and their scores', async () => {
      const categoryId = 1;
      const expected = {
        id: 1,
        competitorIds : [1 , 2],
      }

      const result = await getCategories.withScores(categoryId);

      console.log(sanitize(result));

      expect(result.id).toEqual(expected.id);
      expect(result.competitors.map(c => c.id))
        .toEqual(expect.arrayContaining(expected.competitorIds));
    })
  })
  
  describe('withTotalScores', () => {
    it ('should return a list of one category, each with competitors and their total scores', async () => {
      const categoryId = 1;
      const expected = {
        totalTops: 1,
        totalBonuses: 2,
        totalAttemptTop: 4,
        totalAttemptBonus: 3
      }

      const result = await getCategories.withTotalScores(categoryId);
      const { totalScore } = result.competitors.find(c => c.id === 2);

      expect(totalScore.totalTops).toEqual(expected.totalTops);
      expect(totalScore.totalBonuses).toEqual(expected.totalBonuses);
      expect(totalScore.totalAttemptTop).toEqual(expected.totalAttemptTop);
      expect(totalScore.totalAttemptBonus).toEqual(expected.totalAttemptBonus);

    })
  })
})