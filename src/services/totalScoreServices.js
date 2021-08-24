const { Op } = require('sequelize');
const models = require('../models');
const getTotalScores = require('../queries/getTotalScores');



// update total scores
// arguments : new score, change
// return - Array<TotalScore>
const updateScores = async (updatedScore, change) => {
  const totalScores = await getTotalScores.byScore(updatedScore);  
  const result = await Promise.all(totalScores.map((total) => total.adjustBy(change)));
  return result;
}

module.exports = {
  updateScores
}