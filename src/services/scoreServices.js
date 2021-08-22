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

// create a new score
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

//----------------------------------------------------------------------------------------

// filter out any duplicates
const filterOutDuplicate = async ( competitorId, problemIds ) => {
  const duplicateProblemIds = await models.Score.findAll({
    attributes: ['problemId'],
    where : { 
      [Op.and]: [ 
        { problemId: problemIds }, 
        { competitorId: competitorId }
      ]
    }
  });
  const duplicateProblemIdArray = duplicateProblemIds.map(({ problemId }) => problemId )
  const result = problemIds.filter((id) => !duplicateProblemIdArray.includes(id))
  return result;
}

// filter out any problems that are not in competitor's set
const filterProblemsNotInCompetitorSet = async ( competitorId, problemIds ) => {
  const problemSet = await getProblems.byCompetitorId(competitorId);
  const problemSetIds = problemSet.map(({ id }) => id);
  const result = problemIds.filter((id) => problemSetIds.includes(id));
  return result;
}

// combine
const filterProblemIds = async ( competitorId, problemIds ) => {
  const uniqueProblemIds = await filterOutDuplicate(competitorId, problemIds);

  if (!uniqueProblemIds.length) return [];
  const result = await filterProblemsNotInCompetitorSet(competitorId, uniqueProblemIds)
  return result;
}


// create new set of scores
// arguments : competitorId, problemIds
// return 
//  - Array<Score>
const createMany = async ( competitorId, problemIds ) => {
  const filteredProblemIds = await filterProblemIds(competitorId, problemIds);

  if ( !filteredProblemIds.length ) return null
  const scoreData = filteredProblemIds.map((problemId) => {
    return { competitorId, problemId }
  })
  const result = await models.Score.bulkCreate(scoreData);
  return result;
}




// remove a score from id
// return 
//  - int
const remove = async (scoreId) => {
  const scoreRemoved = await models.Score.destroy({
    where : {id : scoreId }
  })
  return scoreRemoved;
}

module.exports = {
  createOne,
  createMany,
  remove
}