const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is Required',
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },

    problems: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

CategorySchema.virtual('totalScores', {
  ref: 'TotalScore', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'category', // is equal to `foreignField`
  justOne: false,
});

// Duplicate the ID field.
CategorySchema.virtual('id').get(() => this._id);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
