const Event = require('../models/Event');

const createEvent = async (newEventData) => {

  const {name, location, userId} = newEventData;
  const eventData = await Event.create(
    {
      name,
      location,
      organisers : [{ userId: userId  }]
    },
    {
      include: [ Event.Organiser ]
    });
  return eventData;
}


module.exports = createEvent;