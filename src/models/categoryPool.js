const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const competitor = require('./competitor');
const category = require('./category');
const BaseEntity = require('./BaseEntity');

class CategoryPoolDb extends Model {}

const categoryPool = new BaseEntity(CategoryPoolDb);

categoryPool.init = () => {
  CategoryPoolDb.init(
    {
      competitorId: {
        type: DataTypes.INTEGER,
        references: {
          model: competitor.getModel(), 
          key: 'id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: category.getModel(),
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

  competitor.getModel().belongsToMany(category.getModel(), {through: CategoryPoolDb});
  category.getModel().belongsToMany(competitor.getModel(), {through: CategoryPoolDb});
}

categoryPool.init();

// to avoid registering a competitor to a wrong category (in a different event)
const validateInput = async (values) => {
  const {competitorId, categoryId} = values;
  const aCompetitor = await competitor.findByPk(competitorId);
  const aCategory = await category.findByPk(categoryId);
  if (aCategory.eventId !== aCompetitor.eventId) {
    throw new Error('This competitor cannot register to this category.')
  }
  return true;
}

// build and create -- need to test that events matches
categoryPool.build = async (values, options) => {
  if (validateInput(values)) {
    return categoryPool.getModel().build(values, options);
  }
}

categoryPool.create = async (values, options) => {
  if (validateInput(values)) {
    return categoryPool.getModel().create(values, options);
  }
}

module.exports = categoryPool;