require('dotenv').config();
const mongoose = require('mongoose');

const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/boulderDB';
const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected');
});

const connectDB = async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
