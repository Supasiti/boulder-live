const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class Event extends Model {}

Event.init(
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
        is: /^[a-zA-z][a-zA-z0-9\s]*[a-zA-z0-9]/g,
      }
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pending',
      validate : {
        isIn: ['pending', 'cancelled', 'open', 'running', 'ended']
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);


module.exports = Event;