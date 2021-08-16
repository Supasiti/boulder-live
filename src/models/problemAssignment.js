const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Problem = require('./Problem');
const Category = require('./Category');

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

Category.Problem = Category.belongsToMany(Problem, {through: 'problem_assignment'});
Problem.Category = Problem.belongsToMany(Category, {through: 'problem_assignment'});

module.exports = ProblemAssignment;