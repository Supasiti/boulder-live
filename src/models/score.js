const { Model, DataTypes, Op } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');
const Competitor = require('./competitor').getModel();
const Problem = require('./problem').getModel();
const categoryPool = require('./categoryPool');
const problemAssignment = require('./problemAssignment');

class ScoreDb extends Model {}

const score = new BaseEntity(ScoreDb);

// add init method 
score.init = () => {
  ScoreDb.init(
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
  
  Competitor.belongsToMany(Problem, {through: 'score'});
  Problem.belongsToMany(Competitor, {through: 'score'});
}

score.init();

module.exports = score;