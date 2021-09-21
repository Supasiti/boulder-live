const query = require('../queries');
const models = require('../models');
const _ = require('../utils/arrayUtils');

//----------------------------------------------------------------------------------------

const getNewProblemIds = async (categoryId) => {
  const category = await models.Category.findById(categoryId);
  return category.problems;
};

// need to convert toString to compare
const filterOut = (newIds, oldIds) => {
  const oldIdStrings = oldIds.map((o) => o.toString());
  const result = newIds.filter(
    (id) => !oldIdStrings.includes(id.toString()),
  );
  return result;
};

const getScoresToCreate = (problemIdsToUse) => {
  const result = problemIdsToUse.map((id) => ({ problem: id }));
  return result;
};

// create new set of scores and update total score
// arguments : competitor, categoryId
// return
//  - boolean
const generate = async (competitor, categoryId) => {
  const oldProblemIds = _.mapKey(competitor.scores, 'problem');
  const newProblemIds = await getNewProblemIds(categoryId);
  const problemIdsToUse = filterOut(newProblemIds, oldProblemIds);
  const scoresToCreate = getScoresToCreate(problemIdsToUse);
  const newScores = await models.Score.create(scoresToCreate);
  const newScoreIds = _.mapKey(newScores, '_id');
  competitor.scores = competitor.scores.concat(newScoreIds);
  await competitor.save();
  return newScores;
};

//----------------------------------------------------------------------------------------
// remove a score from id
// return
//  - int
const remove = async (scoreId) => {
  const scoreRemoved = await models.Score.destroy({
    where: { id: scoreId },
  });
  return scoreRemoved;
};

//----------------------------------------------------------------------------------------
// UPDATE

// update old score with new one
const updateWithNew = async (oldScore, newScore) => {
  const change = oldScore.difference(newScore);
  const updatedScore = await oldScore.update(newScore);
  totalScore.updateScores(updatedScore, change);
  return updatedScore;
};

// update a score
// arguments : { scoreId, new score}
const update = async (newScore) => {
  const { scoreId } = newScore;
  const oldScore = await models.Score.findByPk(scoreId);
  const result = await updateWithNew(oldScore, newScore);
  return result;
};

// update a score with eiter top or bonus or attempt
// arguments :
//   - scoreId,
//   - toAdd - function of Score to call
const addToScore = async (scoreId, toAdd) => {
  const oldScore = await models.Score.findByPk(scoreId);
  const newScore = oldScore[toAdd].apply(oldScore); // equiv to oldScore.'toAdd'();
  const result = await updateWithNew(oldScore, newScore);
  return result;
};

module.exports = {
  addTop: (scoreId) => addToScore(scoreId, 'addTop'),
  addBonus: (scoreId) => addToScore(scoreId, 'addBonus'),
  addAttempt: (scoreId) => addToScore(scoreId, 'addAttempt'),
  remove,
  update,
  generate,
};
