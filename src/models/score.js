const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelizeConnection');

class Score extends Model {

  // return a new score with add top
  addTop () {
    if (this.top) return {...this};
    const result = {
      top: true,
      bonus: true,
      attemptTop: this.attempts + 1,
      attemptBonus: this.bonus ? this.attemptBonus : this.attempts + 1,
      attempts: this.attempts + 1,
    };
    return result;
  }

  // return a new score with add bonus
  addBonus () {
    if (this.bonus) return {...this};
    const result = {
      top: this.top,
      bonus: true,
      attemptTop: this.attemptTop,
      attemptBonus: this.attempts + 1,
      attempts: this.attempts + 1,
    };
    return result;
  }

  // return a new score with added attempt
  addAttempt () {
    if (this.top && this.bonus) return {...this};
    const result = {
      top: this.top,
      bonus: this.bonus,
      attemptTop: this.attemptTop,
      attemptBonus: this.attemptBonus,
      attempts: this.attempts + 1,
    };
    return result;
  }

  // return a difference between the old and new scores
  difference ( newScore ) {
    const properties = ['top', 'bonus', 'attemptTop', 'attemptBonus', 'attempts'];

    const result = properties.reduce((change, property) => {
      if (!(property in newScore)) return { ...change };
      const changeInProperty = newScore[property] - this[property];
      const result = { ...change, [property]: changeInProperty }
      return result;
    }, {})
    return result;
  }
}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bonus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      isConsistentWithTop (value){
        if (this.top && !value){
          throw new Error('A bonus is also archieved when a top is archieved.')
        }
      }
    },
    attemptTop: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        isConsistentWithTop (value){
          if (this.top && value === 0){
            throw new Error('A number of attempts cannot be zero if a top is archieved.')
          }
          if (!this.top && value >0) {
            throw new Error('A number of attempts must be zero if there is no top.')
          }
        }
      }
    },
    attemptBonus: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate : {
        isConsistentWithBonus (value){
          if (this.bonus && value === 0){
            throw new Error('A number of attempts cannot be zero if a bonus is archieved.')
          }
          if (!this.bonus && value > 0) {
            throw new Error('A number of attempts must be zero if there is no bonus.')
          }
        },
        isConsistentWithAttemptTop (value) {
          if (this.attemptTop < value && this.top)
            throw new Error('Attempt top must be greater or equal to attempt bonus');
        }
      }
    },
    attempts: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate : {
        isConsistent (value){
          const minAttempts = Math.max(this.attemptTop, this.attemptBonus);
          if (value < minAttempts) {
            throw new Error('Attempts must be greater or equal to max(attemptTop, attemptBonus)');
          }
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'score',
  }
);



module.exports = Score;