const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class UserDb extends Model {}

UserDb.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate :{
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = UserDb;