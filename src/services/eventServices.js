const { Event, Organiser } = require('../models');
const query = require('../queries');
const utils = require('../../utils/arrayUtils');
const sanitize = require('./sanitize');

// create a new event
// arguments : name, location, userId
// return
//  - Event
const create = async (newEventData) => {
  const { name, location, userId } = newEventData;
  const eventData = await Event.create(
    {
      name,
      location,
      organisers: [{ userId }],
    },
    {
      include: [Organiser],
    },
  );
  return eventData;
};

// remove an event from id
// return
//  - int
const remove = async (eventId) => {
  const eventsRemoved = await Event.destroy({
    where: { id: eventId },
  });
  return eventsRemoved;
};

// update an event
// argument eventData, eventId
// return
//  - Event
const update = async (eventData, eventId) => {
  const eventsUpdated = await Event.update(eventData, {
    where: { id: eventId },
  });
  if (!eventsUpdated[0]) return null;
  const updatedEvents = await query.getAllEvents({ id: eventId });
  return updatedEvents[0];
};

module.exports = {
  create,
  update,
  remove,
};
