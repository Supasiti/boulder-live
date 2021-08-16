const Event = require('../models/Event');
const Category = require('../models/Category')
const Problem = require('../models/Problem')
const ProblemAssignment = require('../models/ProblemAssignment')

// parse Event data into a nice format == include categories and problems
const parseFull = (event) => {
  if (event instanceof Event){
    const result = Event.parse(event);
    result.categories = event.categories.map(c => {
      const parsed = Category.parse(c);
      parsed.problems = c.problems.map(p => Problem.parse(p));
      return parsed;
    });
    return result;
  }
  return null
}

// get all event
// return 
//  - Array<Object>
const all = async (cleaned=true) => {
  const eventData = await Event.findAll({
    include: {
      model: Category,
      include: Problem
    }
  })
  if (!cleaned) return eventData; 
  return eventData.map(e => parseFull(e));
}


module.exports = {
  all
}