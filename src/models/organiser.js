const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const User = require('./User');
const Event = require('./Event');

class Organiser extends Model {}

Organiser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, 
        key: 'id'
      }
    },
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'organiser',
  }
);

User.hasMany(Organiser);
Organiser.belongsTo(User);

Event.hasMany(Organiser);
Organiser.belongsTo(Event);


module.exports = Organiser;