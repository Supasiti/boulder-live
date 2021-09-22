const models = require('../models');
const query = require('../queries');
const competitorServices = require('./competitorServices');

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

const findOrCreateCompetitor = async (data) => {
  const filter = { user: data.userId, event: data.eventId };
  const saved = await models.Competitor.findOne(filter).catch(
    console.error,
  );
  if (!saved) {
    const result = await competitorServices.create(data);
    return result;
  }
  return saved;
};

const rearrange = (competitorData) => {
  const { scores, categories, ...competitor } = competitorData;
  const result = {
    competitor,
    scores,
    categories,
  };
  return result;
};

// let competitor join event
// argument : { userId , eventId }
// return {
//   competitor: Number,
//   scores: Array<Score>
//   categoryIds: Array<int>
// }
const join = async (data) => {
  const competitor = await findOrCreateCompetitor(data);
  const fullData = await query.getCompetitor(competitor._id);
  const result = rearrange(fullData);
  return result;
};

module.exports = {
  create,
  update,
  // remove,
  join,
};
