const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');
const User = require('./user').getModel();
const Event = require('./event').getModel();

class CompetitorDb extends Model {}

const competitor = new BaseEntity(CompetitorDb);

// init the model
competitor.init = () => {
  CompetitorDb.init(
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
}

competitor.init();

module.exports = competitor;