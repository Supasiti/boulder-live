const { Op } = require('sequelize');
const models = require('../models');
const query = require('../queries');
const totalScore = require('../services/totalScoreServices');
const sanitize = require('./sanitize');

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
  const problemSet = await query.getProblems.byCompetitorId(competitorId);
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
      problemId: problemIds,  
      competitorId: competitorId 
    }
  });
  const duplicateProblemIdArray = duplicateProblemIds.map(({ problemId }) => problemId )
  const result = problemIds.filter((id) => !duplicateProblemIdArray.includes(id))
  return result;
}

// // filter out any problems that are not in competitor's set
// const filterProblemsNotInCompetitorSet = async ( competitorId, problemIds ) => {
//   const problemSet = await getProblems.byCompetitorId(competitorId);
//   const problemSetIds = problemSet.map(({ id }) => id);
//   const result = problemIds.filter((id) => problemSetIds.includes(id));
//   return result;
// }

// combine
// const filterProblemIds = async ( competitorId, problemIds ) => {
//   const uniqueProblemIds = await filterOutDuplicate(competitorId, problemIds);
//   return uniqueProblemIds;
  // if (!uniqueProblemIds.length) return [];
  // const result = await filterProblemsNotInCompetitorSet(competitorId, uniqueProblemIds)
  // return result;
// }

// create new set of scores
// arguments : TotalScore
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

// create new set of scores
// arguments : TotalScore
// return 
//  - Array<Score>
const generate = async (totalScore) => {
  const { competitorId, categoryId } = totalScore;
  const problems = await query.getProblems.byCategory(categoryId);
  const problemIds = problems.map(({ id }) => id);
  const filteredProblemIds = await filterOutDuplicate(competitorId, problemIds);
  if ( !filteredProblemIds.length ) return null;
  const scoreData = filteredProblemIds.map((problemId) => {
    return { competitorId, problemId }
  })
  const result = await models.Score.bulkCreate(scoreData);
  return result;
}


//----------------------------------------------------------------------------------------

// remove a score from id
// return 
//  - int
const remove = async (scoreId) => {
  const scoreRemoved = await models.Score.destroy({
    where : {id : scoreId }
  })
  return scoreRemoved;
}

//----------------------------------------------------------------------------------------

// UPDATE
// update a score
// arguments : { scoreId, new score}
const update = async (newScore) => {
  const { scoreId } = newScore;
  const oldScore = await models.Score.findByPk(scoreId);
  const change = oldScore.difference(newScore);
  const updatedScore = await oldScore.update(newScore);
  await totalScore.updateScores(updatedScore, change);
  return updatedScore;
}

module.exports = {
  createOne,
  createMany,
  remove,
  update,
  generate
}