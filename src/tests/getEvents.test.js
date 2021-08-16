const getEvents = require('../queries/getEvents');

describe('../src/queries/getEvents',  () => {
  const firstEvent = {
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

  describe('all', () => {
    it ('should returns a list of events', async () => {    
      const expected = firstEvent;
      const expectedCategoryIds = firstEvent.categories.map(c => c.id);

      const result = await getEvents.all();
      const resultCategoryIds = result[0].toJSON().categories.map(c => c.id);

      expect(result[0].id).toEqual(expected.id);
      expect(resultCategoryIds).toEqual(expect.arrayContaining(expectedCategoryIds))
    })
  })

  describe('organisedByUser', () => {
    it ('should returns a list of events organised by a user', async () => {    
      const input = 1;
      const expected = firstEvent;
      const expectedCategoryIds = firstEvent.categories.map(c => c.id);
      const expectedLength = 1;

      const result = await getEvents.organisedByUser(input);
      const resultCategoryIds = result[0].toJSON().categories.map(c => c.id);

      expect(result[0].id).toEqual(expected.id);
      expect(resultCategoryIds).toEqual(expect.arrayContaining(expectedCategoryIds))
      expect(result.length).toEqual(expectedLength);
    })

    it ('should returns an empty array if there is no event', async () => {    
      const input = 30000;
      const expected = [];

      const result = await getEvents.organisedByUser(input);

      expect(result).toEqual(expected);
    })
  })

  describe('competedByUser', () => {
    it ('should returns a list of events competed by a user', async () => {    
      const input = 3;
      const expected = firstEvent;
      const expectedCategoryIds = firstEvent.categories.map(c => c.id);
      const expectedLength = 1;

      const result = await getEvents.competedByUser(input);
      const resultCategoryIds = result[0].toJSON().categories.map(c => c.id);

      expect(result[0].id).toEqual(expected.id);
      expect(resultCategoryIds).toEqual(expect.arrayContaining(expectedCategoryIds))
      expect(result.length).toEqual(expectedLength);
    })

    it ('should returns an empty array if there is no event', async () => {    
      const input = 1;
      const expected = [];

      const result = await getEvents.competedByUser(input);

      expect(result).toEqual(expected);
    })

  })

  describe('byIds', () => {
    it ('should returns a list of events by a list of ids', async () => {    
      const input = [1,2];
      const expected = firstEvent;
      const expectedCategoryIds = firstEvent.categories.map(c => c.id);
      const expectedLength = 2;

      const result = await getEvents.byIds(input);
      const resultCategoryIds = result[0].toJSON().categories.map(c => c.id);

      expect(result[0].id).toEqual(expected.id);
      expect(resultCategoryIds).toEqual(expect.arrayContaining(expectedCategoryIds))
      expect(result.length).toEqual(expectedLength);
    })

    it ('should returns an empty array if there is no event', async () => {    
      const input = [100, 400];
      const expected = [];

      const result = await getEvents.byIds(input);

      expect(result).toEqual(expected);
    })

  })

})