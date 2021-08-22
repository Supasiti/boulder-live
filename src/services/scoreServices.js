const { Op } = require('sequelize');
const models = require('../models');
const getProblems = require('../queries/getProblems')

// return true if there are duplicate
const isDuplicate = async (newScore) => {
  const scores = await models.Score.findAll({
    where : { 
      [Op.and]: [ 
        { problemId: newScore.problemId }, 
        { competitorId: newScore.competitorId }
      ]
    }
  })
  return (scores.length)? true : false;
}


// return true if a problem is in the set of problems a competitor is assigned
const isProblemInCompetitorsSet = async ( newScore ) => {
  const { competitorId, problemId } = newScore;
  const problemSet = await getProblems.byCompetitorId(competitorId);
  const problemIds = problemSet.map(({ id }) => id);
  return problemIds.includes(problemId);
}


// check that { competitorId, problemId } pair is distinct from other scores
// check that problemId is in the set of problems a competitor registered to
// return boolean
const validateScoreInput = async ( newScore ) => {
  if ( await isDuplicate(newScore) ) return false;
  if ( await isProblemInCompetitorsSet( newScore )) return true ;
  return false;
}

// create new set of scores
// arguments : {competitorId, problemId}
// return 
//  - Score
const createOne = async ( newScore ) => {
  if (!('competitorId' in newScore) || !('problemId' in newScore)) {
    throw new Error('competitorId and problemId are required to create a score.')
  }

  if (await validateScoreInput(newScore)) {
    const score = await models.Score.create(newScore);
    return score;
  }
  return null;

}

module.exports = {
  createOne,

}