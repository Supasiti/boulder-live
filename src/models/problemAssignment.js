const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class ProblemAssignment extends Model {}

ProblemAssignment.init(
  {},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'problem_assignment',
  }
);

module.exports = ProblemAssignment;