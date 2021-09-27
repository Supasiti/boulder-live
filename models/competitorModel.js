const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompetitorSchema = new Schema(
  {
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

    categories: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

CompetitorSchema.virtual('scores', {
  ref: 'Score', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'competitor', // is equal to `foreignField`
  justOne: false,
});

CompetitorSchema.virtual('totalScores', {
  ref: 'TotalScore', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'competitor', // is equal to `foreignField`
  justOne: false,
});

CompetitorSchema.virtual('id').get(() => this._id);

const Competitor = mongoose.model('Competitor', CompetitorSchema);

module.exports = Competitor;
