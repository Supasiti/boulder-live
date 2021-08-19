const Category = require('./Category');
const CategoryPool = require('./CategoryPool');
const Competitor = require('./Competitor');
const Event = require('./Event');
const Organiser = require('./Organiser');
const Problem = require('./Problem');
const ProblemAssignment = require('./ProblemAssignment');
const Score = require('./Score');
const User = require('./User');

// associations

// event - category
Event.hasMany(Category);
Category.belongsTo(Event);

// competitor - category
Competitor.belongsToMany(Category, {through: CategoryPool});
Category.belongsToMany(Competitor, {through: CategoryPool});

//  user - competitor 
User.hasMany(Competitor);
Competitor.belongsTo(User);

// event - competitor
Event.hasMany(Competitor);
Competitor.belongsTo(Event);

// user - organiser
User.hasMany(Organiser);
Organiser.belongsTo(User);

// event - organiser
Event.hasMany(Organiser);
Organiser.belongsTo(Event);

// category - problem
Category.belongsToMany(Problem, {through: 'problem_assignment'});
Problem.belongsToMany(Category, {through: 'problem_assignment'});

// competior - score 
CategoryPool.hasMany(Score);
Score.belongsTo(CategoryPool);

// score - problem
Problem.hasMany(Score);
Score.belongsTo(Problem);


module.exports = {
  Category,
  CategoryPool,
  Competitor,
  Event, 
  Organiser, 
  Problem, 
  ProblemAssignment,
  Score,
  User 
}