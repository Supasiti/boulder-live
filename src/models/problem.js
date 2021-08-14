const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');

class ProblemDb extends Model {}

const problem = new BaseEntity(ProblemDb);

// add init method 
problem.init = () => {
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
}

problem.init();

module.exports = problem;