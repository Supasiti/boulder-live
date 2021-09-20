const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
