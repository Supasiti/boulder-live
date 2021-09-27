const models = require('../models');

const rearrange = (data) => {
  const { categories, problems, ...event } = data.toJSON();
  return {
    problems,
    categories,
    event,
  };
};

// get an event with nice clean data
// return {
//   event: Event,
//   categories: Array<Category>,
//   problems: Array<Problem>,
//   assignments: Array<ProblemAssignment>
// }
const getEvent = async (eventId) => {
  const rawEventData = await models.Event.findById(eventId)
    .populate('categories')
    .populate('problems')
    .populate('organisedBy', 'username')
    .catch((err) => console.error(err));

  const result = rearrange(rawEventData);
  return result;
};

module.exports = getEvent;
