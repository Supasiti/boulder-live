const models = require('../models');

// combine the two methods above
// create a new problem
// arguments : { name, event_id }
// return
//  - Problem
const create = async (newProblem) => {
  const { eventId, ...problemData } = newProblem;
  const result = await models.Problem.create(problemData);
  const event = await models.Event.findByIdAndUpdate(eventId, {
    $push: { problems: result._id },
  });
  console.log(event);
  return result;
};

// remove a problem from id
// return
//  - int
const remove = async (problemId) => {
  const problemsRemoved = await models.Problem.destroy({
    where: { id: problemId },
  });
  return problemsRemoved;
};

//----------------------------------------------------------------------------------------
// UPDATE

// update a problem
// expect Object with problemId and new values
// return
//  - Problem
const update = async (newProblem) => {
  const { problemId } = newProblem;
  await models.Problem.update(newProblem, {
    where: { id: problemId },
  });
  const updatedProblem = models.Problem.findByPk(problemId);
  return updatedProblem;
};

module.exports = {
  create,
  // update,
  // remove,
};
