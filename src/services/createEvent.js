const { Event } = require('../models');

const createEvent = async (newEventData) => {

  const {name, location, userId} = newEventData;
  const eventData = await Event.create(
    {
      name,
      location,
      status : "pending",
      organisers : [{ userId: userId  }]
    },
    {
      include: [ Event.Organiser ]
    });
  return eventData.get({ plain :true });
}


module.exports = createEvent;