const models = require('../models');
const getProblems = require('./getProblems');

const byEventId = async (eventId) => {
  const problemData = await getProblems.byEventId(eventId);
  const assignmentArrays = problemData.map((problem) => problem.problem_assignments);
  const result = [].concat(...assignmentArrays);
  return result;
}

module.exports = {
  byEventId
}