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
Event.Category = Event.hasMany(Category);
Category.Event = Category.belongsTo(Event);

// competitor - category
Competitor.Category = Competitor.belongsToMany(Category, {through: CategoryPool});
Category.Competitor = Category.belongsToMany(Competitor, {through: CategoryPool});

//  user - competitor 
User.Competitor = User.hasMany(Competitor);
Competitor.User = Competitor.belongsTo(User);

// event - competitor
Event.Competitor = Event.hasMany(Competitor);
Competitor.Event = Competitor.belongsTo(Event);

// user - organiser
User.Organiser = User.hasMany(Organiser);
Organiser.User = Organiser.belongsTo(User);

// event - organiser
Event.Organiser = Event.hasMany(Organiser);
Organiser.Event = Organiser.belongsTo(Event);

// category - problem
Category.Problem = Category.belongsToMany(Problem, {through: 'problem_assignment'});
Problem.Category = Problem.belongsToMany(Category, {through: 'problem_assignment'});

// competior - problem
Competitor.Problem = Competitor.belongsToMany(Problem, {through: 'score'});
Problem.Competitor = Problem.belongsToMany(Competitor, {through: 'score'});


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