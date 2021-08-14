const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const EventDb = require('./event').getModel();
const BaseEntity = require('./BaseEntity');

class CategoryDb extends Model {}

const category = new BaseEntity(CategoryDb);

category.init = () => { 
  CategoryDb.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          is: /^[a-zA-z][a-zA-z0-9\s]*[a-zA-z0-9]/g,
        }
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfterStartDateTime(value) {
            if (value <= this.start) {
              throw new Error('end time must be greater than start time.');
            }
          } 
        }
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );

  EventDb.hasMany(CategoryDb);
  CategoryDb.belongsTo(EventDb);
}

category.init();

module.exports = category;