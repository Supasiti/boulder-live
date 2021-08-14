const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const BaseEntity = require('./BaseEntity');

class EventDb extends Model {}

const event = new BaseEntity(EventDb);
event.init = () => {
  EventDb.init(
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
}

event.init();

module.exports = event;