const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
