const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class TotalScore extends Model {}

TotalScore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    competitorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'competitor', 
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    tops: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    bonuses: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    attemptTop: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    attemptBonus: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    attempts: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'total_score'
  }
);



module.exports = TotalScore;