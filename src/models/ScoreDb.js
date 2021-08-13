const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Competitor = require('./CompetitorDb');
const Problem = require('./ProblemDb');

class ScoreDb extends Model {}

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

module.exports = ScoreDb;