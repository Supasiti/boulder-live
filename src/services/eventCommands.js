const { Event, Organiser } = require('../models');
const getEvents = require('../queries/getEvents')


// create a new event
// arguments : name, location, userId
// return 
//  - Event
const create = async (newEventData) => {
  const {name, location, userId} = newEventData;
  const eventData = await Event.create(
    {
      name,
      location,
      status : "pending",
      organisers : [{ userId }]
    },
    {
      include: [ Organiser ]
    });
  return eventData;
}

// remove an event from id
// return 
//  - int
const remove = async (eventId) => {
  const eventsRemoved = await Event.destroy({
    where : {id : eventId }
  })
  return eventsRemoved;
}

// update an event 
// return 
//  - Event
const update = async (newEvent, eventId) => {
  const eventsUpdated = await Event.update(newEvent, {
    where: { id: eventId }
  })
  if (!eventsUpdated[0]) return null;
  const updatedEvent = await getEvents.byIds(eventId);
  return updatedEvent[0];
}



module.exports = {
  create,
  update,
  remove
}