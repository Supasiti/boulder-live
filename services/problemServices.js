const models = require('../models');

// create a new problem
// arguments : { name, eventId }
// return
//  - Problem
const create = async (newProblem) => {
  const { eventId, ...problemData } = newProblem;
  const result = await models.Problem.create(problemData);
  await models.Event.findByIdAndUpdate(eventId, {
    $push: { problems: result._id },
  });
  return result;
};

// remove a problem from id
// return
//  - int
const remove = async (problemId) => {
  const result = await models.Problem.findByIdAndDelete(problemId);
  return result;
};

//----------------------------------------------------------------------------------------
// UPDATE

// update a problem
// expect Object with problemId and new values
// return
//  - Problem
// const update = async (newProblem) => {
//   const { problemId } = newProblem;
//   await models.Problem.update(newProblem, {
//     where: { id: problemId },
//   });
//   const updatedProblem = models.Problem.findByPk(problemId);
//   return updatedProblem;
// };

module.exports = {
  create,
  // update,
  remove,
};
