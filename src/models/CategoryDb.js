const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Event = require('./EventDb');

class CategoryDb extends Model {}

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

Event.hasMany(CategoryDb);
CategoryDb.belongsTo(Event);

module.exports = CategoryDb;