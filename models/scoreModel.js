const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  top: {
    type: Boolean,
    default: false,
  },

  bonus: {
    type: Boolean,
    default: false,
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

  problem: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
  },

  competitor: {
    type: Schema.Types.ObjectId,
    ref: 'Competitor',
  },

  totalScores: {
    type: [{ type: Schema.Types.ObjectId, ref: 'TotalScore' }],
  },
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;
