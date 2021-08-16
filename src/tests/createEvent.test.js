const createEvent = require('../services/createEvent');
const getEvents = require('../queries/getEvents');
const { Event } = require('../models');

describe('src/services/createEvent', () => {

  it ('should create an event and orgniser', async () => {
    const input = {
      userId: 3,
      name: "Boulder Ladder",
      location: "Northside Boulders"
    }

    await createEvent(input);
    const resultEvent = await getEvents.organisedByUser(3);
    expect(resultEvent[0].name).toEqual(input.name);
    expect(resultEvent[0].location).toEqual(input.location);

    await Event.destroy({where : {name: "Boulder Ladder"}});
  })
})