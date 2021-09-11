const models = require('../models');
const sanitize = require('../services/sanitize');

const accumulateAssignments = (acc, problem) => {
  const { problem_assignments, ...sep } = problem;
  const result = {
    problems: [...acc.problems, sep],
    assignments: [...acc.assignments].concat(problem_assignments),
  };
  return result;
};

const extractAssignments = (problems) => {
  const result = problems.reduce(accumulateAssignments, {
    problems: [],
    assignments: [],
  });
  return result;
};

const getAllData = async (eventId) => {
  const eventPromise = models.Event.findOne({
    where: { id: eventId },
    include: [{ model: models.Category }],
  });
  const problemPromise = models.Problem.findAll({
    where: { eventId: eventId },
    include: [models.ProblemAssignment],
  });
  const result = await Promise.all([eventPromise, problemPromise]);
  return result;
};

// get an event with nice clean data
const getEvent = async (eventId) => {
  const [rawEventData, rawProblemData] = await getAllData(eventId);
  const { categories, ...event } = sanitize(rawEventData);
  const cleanedProblems = sanitize(rawProblemData);
  const { problems, assignments } =
    extractAssignments(cleanedProblems);
  return {
    event,
    categories,
    problems,
    assignments,
  };
};

module.exports = getEvent;
