const models = require('../models');


const createProblemAssignments = async (problemId, categoryIds) => {
  const problemAssignmentArray = categoryIds.map( categoryId => {
    return { problemId, categoryId } 
  })
  const result = await models.ProblemAssignment.bulkCreate(problemAssignmentArray);
  return result;
};


// create a new problem
// arguments : { name }
// return 
//  - Problem 
const createOne = async (newProblem) => {
  const result = await models.Problem.create(newProblem);
  return result;
}

// create new problems
// arguments : name, 
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

const getAssociatedProblemAssignments = async (problemId) => {
  const assignments = await models.ProblemAssignment.findAll({
    where : { problemId }
  })
  
  return assignments;
}

const getProblemAssignmentsToCreate = (oldCategoryIds, newCategoryIds, problemId) => {
  const idsToCreate = newCategoryIds.filter((id) => !oldCategoryIds.includes(id))
  const result = idsToCreate.map( (id) => {
    return {
      problemId,
      categoryId: id
    }
  })
  return result;
}

const getProblemAssignmentIdsToRemove = (oldAssignments, newCategoryIds) => {
  const result = oldAssignments
    .filter(({ categoryId }) => !newCategoryIds.includes(categoryId))
    .map(({ id }) => id)
  return result;
}

// update all assciated problem assignments 
const updateAssociatedProblemAssignments = async (problemId, newCategoryIds) => {
  const oldAssignments = await getAssociatedProblemAssignments(problemId);
  const oldCategoryIds = oldAssignments.map(({ categoryId }) => categoryId);
  const assignmentsToCreate = getProblemAssignmentsToCreate(oldCategoryIds, newCategoryIds, problemId);
  const assignmentIdsToRemove = getProblemAssignmentIdsToRemove(oldAssignments, newCategoryIds);

  const assignmentsRomoved = await models.ProblemAssignment.destroy({ where : { id : assignmentIdsToRemove }})
  const newAssignments = await models.ProblemAssignment.bulkCreate(assignmentsToCreate);

  return newAssignments;
}



// update a problem 
// expect Object with problemId and new values
// return 
//  - Problem
const update = async (newProblem) => {
  const { problemId } = newProblem;
  
  const problemsUpdated = await models.Problem.update(newProblem, {
    where: { id: problemId }
  })
  if ('categoryIds' in newProblem) {
    await updateAssociatedProblemAssignments(problemId, newProblem.categoryIds)
  }
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