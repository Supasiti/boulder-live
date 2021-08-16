const getEvents = require('../queries/getEvents');

describe('../src/queries/getEvents',  () => {
  
  describe('all', () => {
    it ('should returns a list of events', async () => {    
      const expected = {
        id: 1,
        name: 'Boulder Together',
        location: 'Crux Bouldering',
        categories : [
          {
            id: 2,
            name: 'Female',
            start: null,
            end: null,
            problems : [
              { id : 2, name : 'F1' },
              { id : 3, name : 'FM1' },
            ]
          },
          {
            id: 1,
            name: 'Male',
            start: null,
            end: null,
            problems : [
              { id : 1, name : 'M1' },
              { id : 3, name : 'FM1' },
            ]
          }
        ]
      };

      const result = await getEvents.all();
      expect(result[0]).toEqual(expected);

    })
  })

  
})