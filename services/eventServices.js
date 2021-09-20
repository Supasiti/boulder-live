const models = require('../models');
const query = require('../queries');
// const competitorServices = require('./competitorServices');

// create a new event
// arguments : { name, location, userId }
// return
//  - Event
const create = async (newEventData) => {
  const { name, location, userId } = newEventData;
  const eventData = await models.Event.create({
    name,
    location,
    organisedBy: [userId],
  });
  return eventData;
};

// remove an event from id
// return
//  - int
// const remove = async (eventId) => {
//   const eventsRemoved = await models.Event.destroy({
//     where: { id: eventId },
//   });
//   return eventsRemoved;
// };

// update an event
// argument  eventId, eventData
// return
//  - Event
const update = async (eventId, eventData) => {
  const updatedEvent = await models.Event.findByIdAndUpdate(
    eventId,
    eventData,
    { returnOriginal: false },
  );
  return updatedEvent;
};

//---------------------------------
// return competitor
// const createCompetitorIfNotExist = async (competitor, data) => {
//   if (!competitor) {
//     await competitorServices.create(data);
//     const result = await query.getCompetitor(data);
//     return result;
//   }
//   return competitor;
// };

// const rearrangeData = (competitorData) => {
//   const { scores, total_scores, ...competitor } = competitorData;
//   const result = {
//     competitor,
//     scores,
//     categoryIds: total_scores.map(({ categoryId }) => categoryId),
//   };
//   return result;
// };

// let competitor join event
// argument : { userId , eventId}
// return {
//   competitor: Number,
//   scores: Array<Score>
//   categoryIds: Array<int>
// }
// const join = async (data) => {
//   const savedCompetitor = await query.getCompetitor(data);
//   const rawCompetitor = await createCompetitorIfNotExist(
//     savedCompetitor,
//     data,
//   );
//   const cleaned = sanitize(rawCompetitor);
//   const result = rearrangeData(cleaned);
//   return result;
// };

module.exports = {
  create,
  update,
  // remove,
  // join,
};
