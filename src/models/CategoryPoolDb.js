const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

const Competitor = require('./CompetitorDb');
const Category = require('./CategoryDb');

class CategoryPoolDb extends Model {}

CategoryPoolDb.init({},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category_pool',
  }
);

Competitor.belongsToMany(Category, {through: 'category_pool'});
Category.belongsToMany(Competitor, {through: 'category_pool'});


module.exports = OrganiserDb;