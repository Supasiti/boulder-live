const Category = require('./Category');
const Competitor = require('./Competitor');
const Event = require('./Event');
const Organiser = require('./Organiser');
const Problem = require('./Problem');
const ProblemAssignment = require('./ProblemAssignment');
const Score = require('./Score');
const TotalScore = require('./TotalScore');
const User = require('./User');

// associations

// event - category
Event.hasMany(Category);
Category.belongsTo(Event);


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
Competitor.hasMany(Score);
Score.belongsTo(Competitor);

// score - problem
Problem.hasMany(Score);
Score.belongsTo(Problem);


// totalScore - competitor
Competitor.hasMany(TotalScore);
TotalScore.belongsTo(Competitor);

// totalScore - category
Category.hasMany(TotalScore);
TotalScore.belongsTo(Category);

module.exports = {
  Category,
  Competitor,
  Event, 
  Organiser, 
  Problem, 
  ProblemAssignment,
  Score,
  TotalScore,
  User 
}