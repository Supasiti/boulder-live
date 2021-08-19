const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class ProblemAssignment extends Model {}

ProblemAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    problemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'problem', 
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'problem_assignment',
  }
);

module.exports = ProblemAssignment;