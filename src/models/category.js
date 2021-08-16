const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');
const Event = require('./Event');

class Category extends Model {}

Category.init(
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

Event.hasMany(Category);
Category.belongsTo(Event);


// return the bare properties in user
Category.parse = (category) => {
  if (category instanceof Category) {
    const {id, name, start, end} = category;
    return {id, name, start, end}; 
  }
  return null;
}

module.exports = Category;