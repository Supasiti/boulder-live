const sequelize = require('../configs/sequelizeConnection');

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
const problemSeedData = require('./problemSeedData.json');

const organiserSeedData = require('./organiserSeedData.json');
const categorySeedData = require('./categorySeedData.json');

const problemAssignmentSeedData = require('./problemAssignmentSeedData.json');
const competitorSeedData = require('./competitorSeedData.json');

const categoryPoolSeedData = require('./categoryPoolSeedData.json');
const scoreSeedData = require('./scoreSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await user.bulkCreate(userSeedData);
  await event.bulkCreate(eventSeedData);
  await problem.bulkCreate(problemSeedData);
  
  await organiser.bulkCreate(organiserSeedData);
  await category.bulkCreate(categorySeedData);

  await problemAssignment.bulkCreate(problemAssignmentSeedData);
  await competitor.bulkCreate(competitorSeedData);

  await categoryPool.bulkCreate(categoryPoolSeedData);    
  await score.bulkCreate(scoreSeedData);    
}

module.exports = seedDatabase;