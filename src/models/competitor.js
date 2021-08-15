const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const User = require('./User');
const Event = require('./Event');

class Competitor extends Model {}

// init the model
Competitor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    status: {
      type:DataTypes.STRING(40),
      allowNull: false,
      validate : {
        in: ['pending', 'approved', 'withdrawn']
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'competitor',
  }
);
User.belongsToMany(Event, {through: 'competitor'});
Event.belongsToMany(User, {through: 'competitor'});

module.exports = Competitor;