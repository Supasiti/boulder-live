const event = require('../services/eventServices');
const getEvents = require('../queries/getEvents');
const sanitize = require('../services/sanitize')

describe('src/services/eventCommands', () => {

  // create and remove
  it ('should create an event and orgniser', async () => {
    const input = {
      userId: 3,
      name: "Boulder Ladder",
      location: "Northside Boulders"
    }

    const eventData = await event.create(input);
    const resultEvent = await getEvents.byIds(eventData.id);

    expect(resultEvent[0].name).toEqual(input.name);
    expect(resultEvent[0].location).toEqual(input.location);

    await event.remove(eventData.id);
  })


  // update event
  describe('update', () => { 
    it('should return a new event', async () => {

      const firstInput  = {
        name: "Boulder Ladder",
        location: "Northside Boulders"
      }
      const secondInput = { name: "Boulder Plus" }

      const createdData = await event.create(firstInput);
      const updatedData = await event.update(secondInput, createdData.id);
      const rowsRemoved = await event.remove(createdData.id);

      expect(updatedData.name).toEqual(secondInput.name);
    })
  })

})