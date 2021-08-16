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
      validate : {
        isIn: ['pending', 'cancelled', 'open', 'running', 'closed']
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

// return the bare properties in user
Event.parse = (event) => {
  if (event instanceof Event) {
    const {id, name, location} = event;
    return {id, name, location}; 
  }
  return null;
}


module.exports = Event;