const query = require('../queries');
const models = require('../models');
const _ = require('../utils/arrayUtils');

//----------------------------------------------------------------------------------------

// need to convert toString to compare
const filterOut = (newIds, oldIds) => {
  const oldIdStrings = oldIds.map((o) => o.toString());
  const result = newIds.filter(
    (id) => !oldIdStrings.includes(id.toString()),
  );
  return result;
};

const getScoresToCreate = (competitor, problemIds) => {
  const result = problemIds.map((id) => ({
    problem: id,
    competitor: competitor._id,
  }));
  return result;
};

// create new set of scores
// arguments : competitor, category
// return
//  - boolean
const generate = async (competitor, category) => {
  const oldProblemIds = _.mapToKey(competitor.scores, 'problem');
  const problemIdsToUse = filterOut(category.problems, oldProblemIds);
  const scoresToCreate = getScoresToCreate(
    competitor,
    problemIdsToUse,
  );
  const result = await models.Score.create(scoresToCreate);
  return result;
};

//--------------------------------------------------------------------

// will naively add reference to a total score to each score in category -- no check
const addRefToTotal = async (competitor, category, totalScore) => {
  const scores = await models.Score.find()
    .where('competitor')
    .equals(competitor._id)
    .where('problem')
    .in(category.problems)
    .catch(console.error);
  const promises = scores.map((score) => {
    score.totalScores = [...score.totalScores, totalScore._id];
    return score.save();
  });

  const result = await Promise.all(promises);
  return result;
};

//--------------------------------------------------------------------
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
  addRefToTotal,
};
