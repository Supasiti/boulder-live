const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Competitor = require('./competitor').getModel();
const Category = require('./category').getModel();
const BaseEntity = require('./BaseEntity');

class CategoryPoolDb extends Model {}

const categoryPool = new BaseEntity(CategoryPoolDb);

categoryPool.init = () => {
  CategoryPoolDb.init(
    {
      competitorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Competitor, 
          key: 'id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: Category,
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category_pool'
    }
  );

  Competitor.belongsToMany(Category, {through: CategoryPoolDb});
  Category.belongsToMany(Competitor, {through: CategoryPoolDb});
}

categoryPool.init();

// build and create -- need to test that events matches


module.exports = categoryPool;