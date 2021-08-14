const category = require('../models/category');
const categoryPool = require('../models/categoryPool');
const competitor = require('../models/competitor');
const event = require('../models/event');
const organiser = require('../models/organiser');
const problem = require('../models/problem');
const problemAssignment = require('../models/problemAssignment');
const score = require('../models/score');
const user = require('../models/user');

// data
const userSeedData = require('./userSeedData.json');
const eventSeedData = require('./eventSeedData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await user.bulkCreate(userSeedData);
  await event.bulkCreate(eventSeedData);
}