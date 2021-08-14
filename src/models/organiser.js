const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const User = require('./user').getModel();
const Event = require('./event').getModel();
const BaseEntity = require('./BaseEntity');

class OrganiserDb extends Model {}

const organiser = new BaseEntity(OrganiserDb);

// add init method 
organiser.init = () => {
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
}

organiser.init();

module.exports = organiser;