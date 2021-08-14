const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');
const Problem = require('./problem').getModel();
const Category = require('./category').getModel();

class ProblemAssignmentDb extends Model {}

const problemAssignment = new BaseEntity(ProblemAssignmentDb);

// add init method 
problemAssignment.init = () => {
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
};

problemAssignment.init();

module.exports = problemAssignment;