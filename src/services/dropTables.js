const category = require('../models/category');
const categoryPool = require('../models/categoryPool');
const competitor = require('../models/competitor');
const event = require('../models/event');
const organiser = require('../models/organiser');
const problem = require('../models/problem');
const problemAssignment = require('../models/problemAssignment');
const score = require('../models/score');
const user = require('../models/user');

const dropTables = async () => {
  await score.drop();
  
  await categoryPool.drop();
  await problemAssignment.drop();
  
  await organiser.drop();
  await competitor.drop();
  
  await category.drop();
  
  await problem.drop();
  await event.drop();
  await user.drop();
}

module.exports = dropTables;

