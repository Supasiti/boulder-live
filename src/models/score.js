const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Competitor = require('./Competitor');
const Problem = require('./Problem');

class Score extends Model {}

Score.init(
  {
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bonus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      isConsistentWithTop (value){
        if (this.top && !value){
          throw new Error('A bonus is also archieved when a top is archieved.')
        }
      
      }
    },
    attemptTop: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isConsistentWithTop (value){
          if (this.top && value === 0){
            throw new Error('A number of attempts cannot be zero if a top is archieved.')
          }
          if (!this.top && value >0) {
            throw new Error('A number of attempts must be zero if there is no top.')
          }
        }
      }
    },
    attemptBonus: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate : {
        isConsistentWithBonus (value){
          if (this.bonus && value === 0){
            throw new Error('A number of attempts cannot be zero if a bonus is archieved.')
          }
          if (!this.bonus && value > 0) {
            throw new Error('A number of attempts must be zero if there is no bonus.')
          }
        },
        isConsistentWithAttemptTop (value) {
          if (this.attemptTop < value)
            throw new Error('Attempt top must be greater or equal to attempt bonus');
        }
      }
    },
    attempts: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate : {
        isConsistent (value){
          const minAttempts = Math.max(this.attemptTop, this.attemptBonus);
          if (value < minAttempts) {
            throw new Error('Attempts must be greater or equal to max(attemptTop, attemptBonus)');
          }
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'score',
  }
);

Competitor.Problem = Competitor.belongsToMany(Problem, {through: 'score'});
Problem.Competitor = Problem.belongsToMany(Competitor, {through: 'score'});


// return the bare properties in user
Score.parse = (score) => {
  if (score instanceof Score) {
    const {top, bonus, attemptTop, attemptBonus, attempts} = score;
    return {top, bonus, attemptTop, attemptBonus, attempts};
  }
  return null;
}

module.exports = Score;