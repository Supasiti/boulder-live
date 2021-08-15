const sequelize = require('../configs/sequelizeConnection');

const Category = require('../models/Category');
const CategoryPool = require('../models/CategoryPool');
const Competitor = require('../models/Competitor');
const Event = require('../models/Event');
const Organiser = require('../models/Organiser');
const Problem = require('../models/Problem');
const ProblemAssignment = require('../models/ProblemAssignment');
const Score = require('../models/Score');
const User = require('../models/User');

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

// function
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userSeedData);
  await Event.bulkCreate(eventSeedData);
  await Problem.bulkCreate(problemSeedData);
  
  await Organiser.bulkCreate(organiserSeedData);
  await Category.bulkCreate(categorySeedData);

  await ProblemAssignment.bulkCreate(problemAssignmentSeedData);
  await Competitor.bulkCreate(competitorSeedData);

  await CategoryPool.bulkCreate(categoryPoolSeedData);    
  await Score.bulkCreate(scoreSeedData);    
}

module.exports = seedDatabase;