const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Problem = require('./ProblemDb');
const Category = require('./CategoryDb');

class ProblemAssignmentDb extends Model {}

ProblemAssignmentDb.init(
  {},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'problem_assignment',
  }
);

Category.belongsToMany(Problem, {through: 'problem_assignment'});
Problem.belongsToMany(Category, {through: 'problem_assignment'});

module.exports = ProblemAssignmentDb;