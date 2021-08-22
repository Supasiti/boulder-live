const { Op } = require('sequelize');
const score = require('../services/scoreServices');
const sanitize = require('../services/sanitize')
const models = require('../models');


describe('src/services/scoreServices', () => {

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
      console.log('new score id:', newScore.id);
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
})