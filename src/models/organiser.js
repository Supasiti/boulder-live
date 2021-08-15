const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const User = require('./User');
const Event = require('./Event');

class Organiser extends Model {}

Organiser.init({},
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


module.exports = Organiser;