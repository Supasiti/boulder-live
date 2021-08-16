const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class Problem extends Model {}

Problem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        is: /[a-zA-z0-9\s]*/g,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'problem',
  }
);

// return the bare properties in user
Problem.parse = (problem) => {
  if (problem instanceof Problem) {
    const {id, name} = problem;
    return {id, name}; 
  }
  return null;
}

module.exports = Problem;