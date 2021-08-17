const { Score } = require('../models');

// generate a total score from a set of scores
// return 
//  - Object with totalTops, totalBonuses, totalAttemptTop, totalAttemptBonus
const fromScores = (scores) => {
  if (scores instanceof Score){ // allowing for a single score
    return {
      totalTops : scores.top? 1 : 0,
      totalBonuses : scores.bonus? 1 : 0,
      totalAttemptTop : scores.attemptTop,
      totalAttemptBonus : scores.attemptBonus
    }
  }

  if (scores instanceof Array ) {
    return scores.reduce((acc, cur) => {
      return {
        totalTops : cur.top? acc.totalTops + 1 : acc.totalTops,
        totalBonuses : cur.bonus? acc.totalBonuses + 1 : acc.totalBonuses,
        totalAttemptTop : acc.totalAttemptTop + cur.attemptTop,
        totalAttemptBonus : acc.totalAttemptBonus + cur.attemptBonus,
      }
    }, {
      totalTops :  0,
      totalBonuses :  0,
      totalAttemptTop : 0,
      totalAttemptBonus : 0
    })
  }

  throw new Error('expect either Score or Array<Score> as an input');
}

module.exports = {
  fromScores
}