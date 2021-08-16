const Event = require('../models/Event');
const Category = require('../models/Category')
const Problem = require('../models/Problem')
const ProblemAssignment = require('../models/ProblemAssignment')


const parseFull = (event) => {
  if (event instanceof Event){
    // const result = Event.parse(event);
    // result.categories = event.categories.map(c => {
    //   // const parsed = Category.parse(c);
    //   // parsed.problems = c.problems.map(p => Problem.parse(p));
    //   // return parsed;
    //   return c;
    // })
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


const all = async () => {
  const eventData = await Event.findAll({
    include: {
      model: Category,
      include: Problem
    }
  })
  // return eventData;
  // return await Event.findAll({
  //   include: {
  //     model: Category,
  //     include: Problem
  //   }
  // }).catch(console.error);
  // return eventdata;
  return eventData.map(e => parseFull(e));
}


module.exports = {
  all
}