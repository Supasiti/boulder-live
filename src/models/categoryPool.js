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

Competitor.belongsToMany(Category, {through: CategoryPool});
Category.belongsToMany(Competitor, {through: CategoryPool});



// // to avoid registering a competitor to a wrong category (in a different event)
// const validateInput = async (values) => {
//   const {competitorId, categoryId} = values;
//   const aCompetitor = await competitor.findByPk(competitorId);
//   const aCategory = await category.findByPk(categoryId);
//   if (aCategory.eventId !== aCompetitor.eventId) {
//     throw new Error('This competitor cannot register to this category.')
//   }
//   return true;
// }

// // build and create -- need to test that events matches
// categoryPool.build = async (values, options) => {
//   if (validateInput(values)) {
//     return categoryPool.build(values, options);
//   }
// }

// categoryPool.create = async (values, options) => {
//   if (validateInput(values)) {
//     return categoryPool.create(values, options);
//   }
// }

module.exports = CategoryPool;