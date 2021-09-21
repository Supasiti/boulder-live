const models = require('../models');

const properties = {
  tops: 'top',
  bonuses: 'bonus',
  attemptTop: 'attemptTop',
  attemptBonus: 'attemptBonus',
  attempts: 'attempts',
};

const sumScores = (scores, key) => {
  const result = scores.reduce(
    (acc, score) => acc + score[properties[key]],
    0,
  );
  return result;
};

const getTotalFromScores = (scores) => {
  const keys = Object.keys(properties);
  const result = keys.reduce((total, key) => {
    return { ...total, [key]: sumScores(scores, key) };
  }, {});
  return result;
};

const getNewProblemIds = async (categoryId) => {
  const category = await models.Category.findById(categoryId);
  return category.problems;
};

const filterOutScores = (competitor, problemIds) => {
  const result = competitor.scores.filter((score) =>
    problemIds.includes(score.problemId),
  );
  return result;
};

const getScoresToCalculate = async (competitor, categoryId) => {
  const newProblemIds = await getNewProblemIds(categoryId);
  const result = filterOutScores(competitor, newProblemIds);
  return result;
};

const findDuplicate = async (data) => {
  const result = await models.TotalScore.findOne(data);
  return !!result;
};

// create totalScore from a new categoryId  // // need to check if it exist before
//
const create = async (competitor, categoryId) => {
  const competitorId = competitor._id;
  const data = { competitor: competitorId, category: categoryId };
  const exists = await findDuplicate(data);
  if (exists) return;

  const newTotalScore = await models.TotalScore.create(data).catch(
    console.error,
  );
  const scoresForCalculation = await getScoresToCalculate(
    competitor,
    categoryId,
  );
  const updatedTotal = getTotalFromScores(scoresForCalculation);
  const updated = await models.TotalScore.findByIdAndUpdate(
    newTotalScore._id,
    updatedTotal,
    { returnOriginal: false },
  );
  console.log(updated);
  return updated;
};

module.exports = { create };
