const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    status: {
      type:DataTypes.STRING(40),
      allowNull: false,
      validate : {
        isIn : ['pending', 'approved', 'withdrawn']
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


module.exports = Competitor;