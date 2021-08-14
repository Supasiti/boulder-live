const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');

// create a thin wrapper over Sequelize
class UserDb extends Model {}

const user = new BaseEntity(UserDb);

// Initialize a model, representing a table in the DB, with attributes and options.
user.init = () => {
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
        unique: true,
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
}

user.init();

module.exports = user;