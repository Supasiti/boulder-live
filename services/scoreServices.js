const models = require('../models');
const totalScore = require('./totalScoreServices');
const _ = require('../utils/arrayUtils');

//--------------------------------------------------------------------

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

// create new set of scores   --- could condense 3 loops into one
// arguments : competitor, category
// return
//  - Array<Score>
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

//--------------------------------------------------------------------
// UPDATE

// with side effect
// according to the doc, the best way to update a document is throught save()
const addAttempt = async (score) => {
  if (score.top && score.bonus)
    return { newScore: score, change: null };

  score.attempts = score.attempts + 1;
  const newScore = await score.save();
  const change = { attempts: 1 };
  return { newScore, change };
};

// add bonus
const addBonus = async (score) => {
  if (score.bonus) return { newScore: score, change: null };

  const change = {
    bonus: 1,
    attemptBonus: score.attempts + 1,
    attempts: 1,
  };

  score.bonus = true;
  score.attemptBonus = score.attempts + 1;
  score.attempts = score.attempts + 1;

  const newScore = await score.save();
  return { newScore, change };
};

// add top
const addTop = async (score) => {
  if (score.top) return { newScore: score, change: null };

  const change = {
    top: 1,
    bonus: score.bonus ? 0 : 1,
    attemptTop: score.attempts + 1,
    attemptBonus: score.bonus ? 0 : score.attempts + 1,
    attempts: 1,
  };

  score.top = true;
  score.bonus = true;
  score.attemptTop = score.attempts + 1;
  score.attemptBonus = score.bonus
    ? score.attemptBonus
    : score.attempts + 1;
  score.attempts = score.attempts + 1;

  const newScore = await score.save();
  return { newScore, change };
};

const updateScore = {
  top: addTop,
  bonus: addBonus,
  attempt: addAttempt,
};

// add to score
// arguments : score id, key in ['top', 'bonus', 'attempt']

const addToScore = async (scoreId, key) => {
  const oldScore = await models.Score.findById(scoreId);
  const { newScore, change } = await updateScore[key](oldScore);
  if (change) {
    await totalScore.update(newScore.totalScores, change);
  }
  return newScore;
};

module.exports = {
  remove,
  // update,
  generate,
  addRefToTotal,
  addToScore,
};
