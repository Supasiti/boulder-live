const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');
const Competitor = require('./competitor').getModel();
const Problem = require('./problem').getModel();

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
        defaultValue: false
      },
      attemptTop: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      attemptBonus: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      attempts: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
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