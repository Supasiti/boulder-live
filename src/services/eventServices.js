const models = require('../models');
const query = require('../queries');
const sanitize = require('./sanitize');

// create a new event
// arguments : {} name, location, userId }
// return
//  - Event
const create = async (newEventData) => {
  const { name, location, userId } = newEventData;
  const eventData = await models.Event.create(
    {
      name,
      location,
      organisers: [{ userId }],
    },
    {
      include: [models.Organiser],
    },
  );
  return eventData;
};

// remove an event from id
// return
//  - int
const remove = async (eventId) => {
  const eventsRemoved = await models.Event.destroy({
    where: { id: eventId },
  });
  return eventsRemoved;
};

// update an event
// argument eventData, eventId
// return
//  - Event
const update = async (eventData, eventId) => {
  const eventsUpdated = await models.Event.update(eventData, {
    where: { id: eventId },
  });
  if (!eventsUpdated[0]) return null;
  const updatedEvents = await query.getAllEvents({ id: eventId });
  return updatedEvents[0];
};

//---------------------------------
// return competitorId
const createCompetitorIfNotExist = async (competitor) => {
  if (!competitor) {
    await services.competitor.create(data);
    const result = await query.getCompetitor(data);
    return result;
  }
  return competitor;
};

const rearrangeData = (competitorData) => {
  console.log(competitorData);
  const { scores, total_scores, ...competitor } = competitorData;
  const result = {
    competitor,
    scores,
    categoryIds: total_scores.map(({ categoryId }) => categoryId),
  };
  console.log(result);
  return result;
};

// let competitor join event
// argument : { userId , eventId}
// return {
//   competitor: Number,
//   scores: Array<Score>
//   categoryIds: Array<int>
// }

const join = async (data) => {
  const savedCompetitor = await query.getCompetitor(data);
  const rawCompetitor = await createCompetitorIfNotExist(
    savedCompetitor,
  );
  const cleaned = sanitize(rawCompetitor);
  const result = rearrangeData(cleaned);
  return result;
};

module.exports = {
  create,
  update,
  remove,
  join,
};
