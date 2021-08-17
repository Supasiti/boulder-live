const { Score } = require('../models');

// generate a total score from a score
// return 
//  - Object with totalTops, totalBonuses, totalAttemptTop, totalAttemptBonus
const fromScore = (score) => {
  return {
    totalTops : score.top? 1 : 0,
    totalBonuses : score.bonus? 1 : 0,
    totalAttemptTop : score.attemptTop,
    totalAttemptBonus : score.attemptBonus
  }
}

const addScore = (currentTotal, score) => {
  const newScore = fromScore(score);
  const result = {};
  Object.keys(currentTotal).map(key => { result[key] = currentTotal[key] + newScore[key] });
  return result;
}

// return a default total score
const defaultTotalScore = () => {
  return {
    totalTops :  0,
    totalBonuses :  0,
    totalAttemptTop : 0,
    totalAttemptBonus : 0
  }
}

// generate a total score from a set of scores
// return 
//  - Object with totalTops, totalBonuses, totalAttemptTop, totalAttemptBonus
const fromScores = (scores) => {
  if (scores instanceof Score) return fromScore(scores);

  if (scores instanceof Array ) {
    return scores.reduce((runningTotal, score) => addScore(runningTotal, score), defaultTotalScore())
  }
  throw new Error('expect either Score or Array<Score> as an input');
}

module.exports = {
  fromScores
}