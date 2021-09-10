const getCompetitors = require('./getCompetitors');
const getCategories = require('./getCategories');
const getAllEvents = require('./getAllEvents');
const getEvent = require('./getEvent');
const getProblems = require('./getProblems');
const getProblemAssignments = require('./getProblemAssignments');
const getScores = require('./getScores');
const getTotalScores = require('./getTotalScores');
const getUsers = require('./getUsers');

module.exports = {
  getAllEvents,
  getEvent,
  getCompetitors,
  getCategories,
  getProblems,
  getProblemAssignments,
  getScores,
  getTotalScores,
  getUsers,
};
