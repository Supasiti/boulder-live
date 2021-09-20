const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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

  categories: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },

  problems: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
  },

  organisedBy: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
