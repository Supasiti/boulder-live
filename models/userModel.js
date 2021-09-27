const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  },
);

// Duplicate the ID field.
UserSchema.virtual('id').get(() => this._id);

const User = mongoose.model('User', UserSchema);

module.exports = User;
