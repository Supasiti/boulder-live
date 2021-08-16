const sequelize = require('../configs/sequelizeConnection');

const models = require('../models');

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
  await sequelize.sync({ force: true, logging: console.log});
  
  await models.User.bulkCreate(userSeedData);
  await models.Event.bulkCreate(eventSeedData);
  await models.Problem.bulkCreate(problemSeedData);
  
  await models.Organiser.bulkCreate(organiserSeedData);
  await models.Category.bulkCreate(categorySeedData);

  await models.ProblemAssignment.bulkCreate(problemAssignmentSeedData);
  await models.Competitor.bulkCreate(competitorSeedData);

  await models.CategoryPool.bulkCreate(categoryPoolSeedData);    
  await models.Score.bulkCreate(scoreSeedData);    
}

module.exports = seedDatabase;