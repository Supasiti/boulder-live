const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    location: {
      type: String,
      trim: true,
      required: 'Location is Required',
    },

    name: {
      type: String,
      trim: true,
      required: 'Name is Required',
    },

    status: {
      type: String,
      trim: true,
      default: 'pending',
      enum: ['pending', 'cancelled', 'open', 'running', 'ended'],
    },

    organisedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

EventSchema.virtual('categories', {
  ref: 'Category', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'event', // is equal to `foreignField`
  justOne: false,
});

EventSchema.virtual('problems', {
  ref: 'Problem', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'event', // is equal to `foreignField`
  justOne: false,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
