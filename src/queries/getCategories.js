const sequelize = require('../configs/sequelizeConnection');
const Sequelize = require('sequelize');
const models = require('../models');

// it will include competitors in each category and their total scores
// return 
//  - Array<Category> 
const byEventWithScores = async (categoryId) => {
  // const categories = await models.Category.findAll({
  //   where : { eventId: eventId },
  //   include : [
  //     {
  //       model: models.Competitor,
  //       through: {attributes: []},
  //       include: [
  //         models.User, 
  //         {
  //           model: models.Score
  //           // attributes: [
  //           //   // include the summed value here
  //           //   [Sequelize.fn('sum', Sequelize.col('attempt_top')), 'totalAttemptTop']
  //           // ],
  //         }], 
  //       attributes: [
  //         'user.username', 'scores.top'
  //         // include the summed value here
  //         // [Sequelize.fn('sum', Sequelize.col('scores.score.attemptTop')), 'totalAttemptTop']
  //       ],
  //     },
  //   ] 
  // })

  // const categories = await models.Category.findAll({
  //   where : { eventId: eventId },
  //   attributes: [
  //     'competitors.id'
  //   ],
  //   include : [
  //     {
  //       model: models.Competitor,
        
  //     },
  //   ]
  // })
  // const competitorIds = await models.CategoryPool.findAll({
  //   attributes : ['competitorId'],
  //   where : {categoryId : categoryId}
  // })
  // console.log(competitorIds.map(id => id.competitorId));
  // const competitors = await models.Competitor.findAll({
  //   where : { id: competitorIds.map(id => id.competitorId) },
  //   include : [
  //     models.User,
  //     {
  //       model: models.Score,
  //       as: 'scores',
  //       attributes : [
  //         [Sequelize.fn('COUNT', Sequelize.col('scores.id')), 'total']
  //       ],
  //       group: ['scores.id']
  //     }
  //   ],
  //   // attributes : [
  //   //   [Sequelize.fn('COUNT', Sequelize.col('scores.top')), 'total']
  //   // ], 
  //   group: ['id']  
  // })



  return competitors;

}


module.exports = {
  byEventWithScores,
  
}