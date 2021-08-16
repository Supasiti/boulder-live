const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Competitor = require('./Competitor');
const Category = require('./Category');

class CategoryPool extends Model {}

CategoryPool.init(
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

Competitor.Category = Competitor.belongsToMany(Category, {through: CategoryPool});
Category.Competitor = Category.belongsToMany(Competitor, {through: CategoryPool});


module.exports = CategoryPool;