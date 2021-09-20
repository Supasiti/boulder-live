const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompetitorSchema = new Schema({
  number: {
    type: Number,
    trim: true,
  },

  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'withdrawn'],
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  scores: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
  },
});

const Competitor = mongoose.model('Competitor', CompetitorSchema);

module.exports = Competitor;
