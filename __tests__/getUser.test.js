const getUser = require('../queries/getUser');

describe('../src/queries/getUser',  () => {
  
  describe('byId', () => {
    it ('should returns a user if exists', async () => {
      const input = 1;
      const expectedEmail = 'Mary@email.com';
      const expectedId = 1;
      
      const result = await getUser.byId(input);
      expect(result.email).toEqual(expectedEmail);
      expect(result.id).toEqual(expectedId);
    })

    it ('should returns null if doest not exists', async () => {
      const input = 100;
      const expected = null;
      
      const result = await getUser.byId(input);
      expect(result).toBe(expected);
    })
  })

  describe('byEmail', () => {
    it ('should returns a user if exists', async () => {
      const input = 'Mary@email.com';
      const expectedEmail = 'Mary@email.com';
      const expectedId = 1;
      
      const result = await getUser.byEmail(input);
      expect(result.email).toEqual(expectedEmail);
      expect(result.id).toEqual(expectedId);
    })

    it ('should returns null if doest not exists', async () => {
      const input = 'Marasdfy@email.com';
      const expected = null;
      
      const result = await getUser.byEmail(input);
      expect(result).toBe(expected);
    })
  })

  
})
