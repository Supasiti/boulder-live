const Event = require('../models/Event');

const createEvent = async (newEvent) => {

  const {name, location} = newEvent;
  const eventData = await Event.create({
    name,
    location
  });
  return eventData;
}

module.exports = createEvent;