const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

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
        model: 'user', 
        key: 'id'
      }
    },
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
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


module.exports = Organiser;