const categoryPool = require('../models/categoryPool');

const findProblemsByCompetitorId = async (competitorId) => {
  const categoryPoolsEnrolled = await categoryPool.findAll({ 
    where: { competitorId: competitorId }
  });
  const categoriesEnrolled = categoryPoolsEnrolled


  return categoriesEnrolled;
}

// const categoriesEnrolled = await categoryPool.findAll({ 
//   where: { competitorId: competitorId }
// });
// const problemsToCompete = await problemAssignment.findAll({
//   where : {
//     categoryId: {
//       [Op.in]: categoriesEnrolled.map(pool => pool.categoryId),
//     },
//   }
// }) 
// const problemToCompeteIds = problemsToCompete.map(assignment => assignment.problemId);



module.exports = findProblemsByCompetitorId;