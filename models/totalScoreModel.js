const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TotalScoreSchema = new Schema({
  tops: {
    type: Number,
    default: 0,
  },

  bonuses: {
    type: Number,
    default: 0,
  },

  attemptTop: {
    type: Number,
    default: 0,
  },

  attemptBonus: {
    type: Number,
    default: 0,
  },

  attempts: {
    type: Number,
    default: 0,
  },

  competitor: {
    type: Schema.Types.ObjectId,
    ref: 'Competitor',
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const TotalScore = mongoose.model('TotalScore', TotalScoreSchema);

module.exports = TotalScore;
