const sequelize = require('../configs/sequelizeConnection');
const seedCategory = require('./seedCategory');
const seedCategoryPool = require('./seedCategoryPool');
const seedCompetitor = require('./seedCompetitor');
const seedEvent = require('./seedEvent');
const seedOrganiser = require('./seedOrganiser');
const seedProblemAssignment = require('./seedProblemAssignment');
const seedProblem = require('./seedProblem');
const seedScore = require('./seedScore');
const seedUser = require('./seedUser');

// connect with database

const seedAll = async () => {

  // order matters
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedEvent();
  console.log('\n----- EVENTS SEEDED -----\n');

  await seedProblem();
  console.log('\n----- PROBLEMS SEEDED -----\n');

  await seedCompetitor();
  console.log('\n----- COMPETITORS SEEDED -----\n');

  await seedOrganiser();
  console.log('\n----- ORGANISERS SEEDED -----\n');

  await seedCategory();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProblemAssignment();
  console.log('\n----- PROBLEM ASSIGNMENTS SEEDED -----\n');
  
  await seedCategoryPool();
  console.log('\n----- CATEGORY POOLS SEEDED -----\n');

  await seedScore();
  console.log('\n----- SCORES SEEDED -----\n');

  
  process.exit(0);
}

seedAll();