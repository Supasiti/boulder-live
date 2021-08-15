const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Event = require('./event').getModel();
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
          is: /^[a-zA-z0-9][a-zA-z0-9\s]*[a-zA-z0-9]/g,
        }
      },
      start: {
        type: DataTypes.DATE,
      },
      end: {
        type: DataTypes.DATE,
        validate: {
          doesStartExists (){
            if (!this.start) {
              throw new Error('A start time must be supplied.');
            }
          },
          isAfterStartDateTime(value) {
            if (value <= this.start) {
              throw new Error('End time must be greater than start time.');
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

  Event.hasMany(CategoryDb);
  CategoryDb.belongsTo(Event);
}


category.init();

module.exports = category;