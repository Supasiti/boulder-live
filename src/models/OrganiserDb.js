const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

const User = require('./UserDb');
const Event = require('./EventDb');

class OrganiserDb extends Model {}

OrganiserDb.init({},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'organiser',
  }
);

User.belongsToMany(Event, {through: 'organiser'});
Event.belongsToMany(User, {through: 'organiser'});


module.exports = OrganiserDb;