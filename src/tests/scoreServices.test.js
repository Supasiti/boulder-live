const { Op } = require('sequelize');
const score = require('../services/scoreServices');
const sanitize = require('../services/sanitize')
const models = require('../models');


describe('src/services/scoreServices', () => {

  // createOne
  describe('createOne', () => {

    // success condition
    it('should create a score and return it', async () => {

      const input = {
        problemId: 2,
        competitorId: 3
      }

      const rowsDestroyed = await models.Score.destroy({
        where : { 
          [Op.and]: [ 
            { problemId: input.problemId }, 
            { competitorId: input.competitorId }
          ]
        }
      })
      const newScore = await score.createOne(input);
      await models.Score.destroy({ where : { id : newScore.id } })

      expect(newScore.problemId).toEqual(input.problemId);
    })

    // prevent duplication
    it('should return null if it is a duplicate', async () => {

      const input = {
        problemId: 3,
        competitorId: 1
      }
      const expected = null;
      const newScore = await score.createOne(input);

      expect(newScore).toEqual(expected);
    })

    // prevent creating a score for a problem a competitor isn't assigned to
    it('should return null if a problem is not in the competitor\'s set', async () => {

      const input = {
        problemId: 6,
        competitorId: 1
      }
      const expected = null;
      const newScore = await score.createOne(input);

      expect(newScore).toEqual(expected);
    })
  })


  // createMany
  describe('createMany', () => {

    // success
    it('should return an array of newly create scores', async () => {

      const inputCompetitorId = 3;
      const inputProblemIds = [2,3];

      const rowsDestroyed = await models.Score.destroy({ where : { id : [5,6] } })
      const newScores = await score.createMany(inputCompetitorId, inputProblemIds);

      await models.Score.destroy({ where : { id : newScores.map(({ id }) => id) } })

      const resultProblemIds = newScores.map(({ problemId }) => problemId);
      const resultCategoryId = newScores[0].competitorId;

      expect(resultProblemIds).toEqual(expect.arrayContaining(inputProblemIds));
      expect(resultCategoryId).toEqual(inputCompetitorId);
    })

    // prevent duplication
    it('should return null if it is a duplicate', async () => {

      const inputCompetitorId = 5;
      const inputProblemIds = [5];
      
      const expected = null;
      const newScores = await score.createMany(inputCompetitorId, inputProblemIds);

      expect(newScores).toEqual(expected);
    })

    // prevent creating a score for a problem a competitor isn't assigned to
    it('should return null if a problem is not in the competitor\'s set', async () => {

      const inputCompetitorId = 6;
      const inputProblemIds = [1, 5];
      
      const expected = null;
      const newScores = await score.createMany(inputCompetitorId, inputProblemIds);

      expect(newScores).toEqual(expected);
    })

    // filter inconsistent input
    it('should return a subset of new scores with correct inputs', async () => {

      const inputCompetitorId = 3;
      const inputProblemIds = [2,6];
      
      const rowsDestroyed = await models.Score.destroy({
        where : { 
          [Op.and]: [ 
            { problemId: inputProblemIds[0] }, 
            { competitorId: inputCompetitorId }
          ]
        }
      })

      const expectedCompetitorId = 3;
      const expectedProblemIds = [2];
      const newScores = await score.createMany(inputCompetitorId, inputProblemIds);

      const resultProblemIds = newScores.map(({ problemId }) => problemId);
      const resultCategoryId = newScores[0].competitorId;

      expect(resultProblemIds).toEqual(expect.arrayContaining(expectedProblemIds));
      expect(resultCategoryId).toEqual(expectedCompetitorId);
    })

  })


  // update 
  describe('update', () => {
    
    //
    it('should update the score and the total score', async () => {

      const input = {
        scoreId : 11,
        attempts: 4
      }
      const takeDownInput = {
        scoreId : 11,
        attempts: 3 
      }
      const updatedScore = await score.update(input);
      await score.update(takeDownInput);

      expect(updatedScore.attempts).toEqual(input.attempts);
    })
  })

})