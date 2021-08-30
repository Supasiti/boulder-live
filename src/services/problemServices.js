const models = require('../models');


const createProblemAssignments = async (problemId, categoryIds) => {
  const problemAssignmentArray = categoryIds.map( categoryId => {
    return { problemId, categoryId } 
  })
  const result = await models.ProblemAssignment.bulkCreate(problemAssignmentArray);
  return result;
};


// create a new problem
// arguments : { name, event_id }
// return 
//  - Problem 
const createOne = async (newProblem) => {
  const result = await models.Problem.create(newProblem);
  return result;
}

// create new problems
// arguments : Array<{name, event_id }>
// return 
//  - Problem 
const createMany = async (newProblems) => {
  const result = await models.Problem.bulkCreate(newProblems);
  return result;
}


// combine the two methods above

const create = async (newProblems) => {
  if (newProblems instanceof Array) {
    const result = await createMany(newProblems);
    return result;
  } 
  const result = await createOne(newProblems);
  return result;
}

// remove a problem from id
// return 
//  - int
const remove = async (problemId) => {
  const problemsRemoved = await models.Problem.destroy({
    where : {id : problemId }
  })
  return problemsRemoved;
}

//----------------------------------------------------------------------------------------
// UPDATE

// update a problem 
// expect Object with problemId and new values
// return 
//  - Problem
const update = async (newProblem) => {
  const { problemId } = newProblem;
  await models.Problem.update(newProblem, { where: { id: problemId } })
  const updatedProblem = models.Problem.findByPk(problemId);
  return updatedProblem;
}

module.exports = {
  createOne,
  createMany,
  create,
  update,
  remove
}