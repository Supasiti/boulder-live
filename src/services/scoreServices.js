const models = require('../models');
const totalScore = require('../services/totalScoreServices');

//----------------------------------------------------------------------------------------

const getOldScores = async (problemIds, competitorId) => {
  const result = await models.Score.findAll({
    where: {
      problemId: problemIds,
      competitorId: competitorId,
    },
  });
  return result;
};

const getNewProblemIds = (problemIds, oldScores) => {
  const oldProblemIds = oldScores.map(({ problemId }) => problemId);
  const result = problemIds.filter((problemId) => {
    return !oldProblemIds.includes(problemId);
  });
  return result;
};

const createNewScores = (problemIds, competitorId) => {
  const result = problemIds.map((problemId) => {
    return { competitorId, problemId };
  });
  return result;
};

// return [newScores, oldScores]
const sortScores = async (problemIds, competitorId) => {
  const oldScores = await getOldScores(problemIds, competitorId);
  const newProblemIds = getNewProblemIds(problemIds, oldScores);
  const newScores = createNewScores(newProblemIds, competitorId);
  return [newScores, oldScores];
};

const getProblemIds = async (categoryId) => {
  const assignments = await models.ProblemAssignment.findAll({
    attributes: ['problemId'],
    where: { categoryId: categoryId },
  });
  const result = assignments.map(({ problemId }) => problemId);
  return result;
};

// create new set of scores and update total score
// arguments : TotalScore
// return
//  - Array<Score>
const generate = async (totalScore) => {
  const { competitorId, categoryId } = totalScore;
  const problemIds = await getProblemIds(categoryId);
  const [newScores, oldScores] = await sortScores(
    problemIds,
    competitorId,
  );
  totalScore.fromScores(oldScores); // update total score
  const result = await models.Score.bulkCreate(newScores);
  return result;
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
  const newScore = oldScore[toAdd].apply(oldScore); // eval ot oldScore.'toAdd'();
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
