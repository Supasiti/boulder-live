const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'String is Required',
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email is Required',
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      'Please enter a valid e-mail address',
    ],
  },

  password: {
    type: String,
    trim: true,
    minLength: [6, 'A password must be longer than 6 characters.'],
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
