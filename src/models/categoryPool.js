const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class CategoryPool extends Model {}

CategoryPool.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    competitorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'competitor', 
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
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



module.exports = CategoryPool;