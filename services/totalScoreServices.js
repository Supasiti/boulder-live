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

const getScoresForTotal = (competitor, category) => {
  const problemIdStr = category.problems.map((id) => id.toString());
  const result = competitor.scores.filter((score) =>
    problemIdStr.includes(score.problem.toString()),
  );
  return result;
};

const findDuplicate = async (data) => {
  const result = await models.TotalScore.findOne(data);
  return !!result;
};

// create totalScore from a new categoryId
//
const create = async (competitor, category) => {
  const data = { competitor: competitor._id, category: category._id };
  const exists = await findDuplicate(data);
  if (exists) return;

  const scoresForTotal = getScoresForTotal(competitor, category);
  const total = getTotalFromScores(scoresForTotal);
  const totalScoreData = { ...total, ...data };
  const result = await models.TotalScore.create(totalScoreData).catch(
    console.error,
  );
  return result;
};

//--------------------------------------------------------------------

// note there is side effect
// return Promise
const updateOne = (totalScore, change) => {
  const entries = Object.entries(properties);
  entries.forEach(([key, value]) => {
    if (value in change) {
      totalScore[key] = totalScore[key] + change[value];
    }
  });
  return totalScore.save();
};

// update all total scores with change
const update = async (totalScoreIds, change) => {
  const totalScores = await models.TotalScore.find()
    .where('_id')
    .in(totalScoreIds)
    .catch(console.error);
  const promises = totalScores.map((total) =>
    updateOne(total, change),
  );
  const result = await Promise.all(promises);
  return result;
};

module.exports = { create, update };
