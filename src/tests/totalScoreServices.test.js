const { Op } = require('sequelize');
const totalScore = require('../services/totalScoreServices');
const getTotalScores = require('../queries/getTotalScores');
const sanitize = require('../services/sanitize')
const models = require('../models');


describe('src/services/totalScoreServices', () => {

  describe('updateScores', () => {

    // success condition
    it('should update a total score when a score is updated', async () => {

      const scoreId = 11;
      const inputScore = await models.Score.findByPk(scoreId);
      const inputChange = { attempts: 1 }

      const oldTotals = await getTotalScores.byScore(inputScore);
      const results = await totalScore.updateScores(inputScore, inputChange);

      oldTotals.forEach((total) => {
        const resultTotal = results.find((result) => result.id === total.id);
        const resultAttempts = resultTotal.attempts;
        const expectedAttempts = total.attempts + inputChange.attempts;
        
        expect(resultAttempts).toEqual(expectedAttempts);
      })
    })
  })

})