const getScores = require('../queries/getScores');

describe('src/queries/getScores', () => {
  
  describe('byCompetitorAndProblems', () => {
    it ('should return a list of all scores from a competitor and a list of problems', async () => {

      const competitorId = 1;
      const problemIds = [1,3];
      const expectedLength = 2;
      const expectedIds = [1,2]

      const result = await getScores.byCompetitorAndProblems(competitorId, problemIds);
      
      expect(result.map(s => s.id)).toEqual(expect.arrayContaining(expectedIds));
      expect(result.length).toEqual(expectedLength);
    })
  })
  

  // describe('total', () => {
  //   it ('should return a total score from a competitor and a list of problems', async () => {
      
  //     const competitorId = 1;
  //     const problemIds = [1,3];
  //     const expected = { 
  //       totalTops: 2,
  //       totalBonuses: 2,
  //       totalAttemptTop: 2,
  //       totalAttemptBonus: 2
  //     }

  //     const result = await getScores.total(competitorId, problemIds);
      
  //     expect(result.totalTops).toEqual(expected.totalTops);
  //     expect(result.totalBonuses).toEqual(expected.totalBonuses);
  //     expect(result.totalAttemptTop).toEqual(expected.totalAttemptTop);
  //     expect(result.totalAttemptBonus).toEqual(expected.totalAttemptBonus);
      
  //   })
  // })
})