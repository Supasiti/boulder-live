const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/boulderDB';
const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected:', url);
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || url, {
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
