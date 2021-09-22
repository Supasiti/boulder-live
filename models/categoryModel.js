const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
