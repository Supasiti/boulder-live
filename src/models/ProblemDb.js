const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class ProblemDb extends Model {}

ProblemDb.init(
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

module.exports = ProblemDb;