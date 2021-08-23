const getCategories = require('../queries/getCategories');
const sanitize = require('../services/sanitize');

describe('src/queries/getCategories', () => {
  
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
      const totalScore = result.total_scores.find((score) => score.id === 2 );

      expect(totalScore.tops).toEqual(expected.totalTops);
      expect(totalScore.bonuses).toEqual(expected.totalBonuses);
      expect(totalScore.attemptTop).toEqual(expected.totalAttemptTop);
      expect(totalScore.attemptBonus).toEqual(expected.totalAttemptBonus);

    })
  })
})