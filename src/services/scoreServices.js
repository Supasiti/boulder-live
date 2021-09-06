const { Op } = require('sequelize');
const models = require('../models');
const query = require('../queries');
const totalScore = require('../services/totalScoreServices');
const sanitize = require('./sanitize');

//----------------------------------------------------------------------------------------

const getRepeatedScores = async ( competitorId, problemIds) => {
  const result = await models.Score.findAll({
    where : { 
      problemId: problemIds,  
      competitorId: competitorId 
    }
  });
  return result;
}

const getScoreData = (problemIds, competitorId) => {
  const result = problemIds.map((problemId) => {
    return { competitorId, problemId }
  })
  return result;
}

const getScoresToCreate = (newScores, oldScores) => {
  const oldProblemIds = oldScores.map(({ problemId }) => problemId);
  const result = newScores.filter(({ problemId }) => {
    return !oldProblemIds.includes(problemId)
  })
  return result;
}


// create new set of scores and update total score
// arguments : TotalScore
// return 
//  - Array<Score>
const generate = async (totalScore) => {
  const { competitorId, categoryId } = totalScore;
  const problems = await query.getProblems.byCategory(categoryId);
  const problemIds = problems.map(({ id }) => id);
  
  const newScores = getScoreData(problemIds, competitorId);
  const repeatedScores = await getRepeatedScores(competitorId, problemIds);
  
  totalScore.fromScores(repeatedScores); // update total score
  const scoresToCreate = getScoresToCreate(newScores, repeatedScores);
  
  if ( !scoresToCreate.length ) return null;
  const result = await models.Score.bulkCreate(scoresToCreate);
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


// update a score with eiter top or bonus or attempt
// arguments : scoreId, property
const addToScore = async (scoreId, toAdd) => {
  const oldScore = await models.Score.findByPk(scoreId);
  const newScore = oldScore[toAdd].apply(oldScore) // eval ot oldScore.'toAdd'();

  const change = oldScore.difference(newScore);
  const updatedScore = await oldScore.update(newScore);
  await totalScore.updateScores(updatedScore, change);
  return updatedScore;
}



module.exports = {
  addTop: (scoreId) => addToScore(scoreId, 'addTop'),
  addBonus: (scoreId) => addToScore(scoreId, 'addBonus'),
  addAttempt: (scoreId) => addToScore(scoreId, 'addAttempt'),
  remove,
  update,
  generate
}