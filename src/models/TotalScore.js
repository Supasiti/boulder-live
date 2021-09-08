const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

const properties = {
  tops: 'top',
  bonuses: 'bonus',
  attemptTop: 'attemptTop',
  attemptBonus: 'attemptBonus',
  attempts: 'attempts',
};

class TotalScore extends Model {
  async fromScores(scores) {
    const keys = Object.keys(properties);
    const newTotalScore = keys.reduce((total, key) => {
      const value = scores.reduce(
        (acc, score) => acc + score[properties[key]],
        0,
      );
      return { ...total, [key]: value };
    }, {});
    const result = await this.update(newTotalScore);
    return result;
  }

  // adjust the total score by the change
  async adjustBy(change) {
    const keys = Object.keys(properties);
    const newTotalScore = keys.reduce((total, key) => {
      if (!(properties[key] in change)) return { ...total };
      const changeInProperty = this[key] + change[properties[key]];
      const result = { ...total, [key]: changeInProperty };
      return result;
    }, {});

    const result = await this.update(newTotalScore);
    return result;
  }
}

TotalScore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    competitorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'competitor',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
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
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'total_score',
  },
);

module.exports = TotalScore;
