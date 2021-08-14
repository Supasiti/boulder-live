const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Competitor = require('./competitor').getModel();
const Category = require('./category').getModel();
const BaseEntity = require('./BaseEntity');

class CategoryPoolDb extends Model {}

const categoryPool = new BaseEntity(CategoryPoolDb);

categoryPool.init = () => {
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
}

categoryPool.init();

module.exports = categoryPool;