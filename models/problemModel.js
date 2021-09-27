const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
ProblemSchema.virtual('id').get(() => this._id);

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
