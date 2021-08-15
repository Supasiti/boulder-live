const utils = require('../utils/arrayUtils');

const arrayOld = [
  {
    id: "adsf",
    name: "bob"
  },
  {
    id: "heha",
    name: "sue"
  }
]

describe('utils/arrayUtils', () => {

  // append an item to array
  describe('appendTo', () =>{
    it('should return a new array with new item appended', () => {
      const newItem = { id: "jejh", name:"tara"};
      
      const result = utils.appendTo(newItem, arrayOld);

      expect(result).toEqual(expect.arrayContaining(arrayOld));
      expect(result).toEqual(expect.arrayContaining([newItem]));
      expect(result.length).toEqual(3);
      expect(arrayOld).toEqual(arrayOld);
    })
  });

  // appendOrUpdate
  describe('appendOrUpdate', () => {
    it('should return a new array with new item appended if the item\'s id differs', () =>{
      const newItem = { id: "jejh", name:"tara"};
      
      const result = utils.appendOrUpdate(newItem, arrayOld);

      expect(result).toEqual(expect.arrayContaining(arrayOld));
      expect(result).toEqual(expect.arrayContaining([newItem]));
      expect(result.length).toEqual(3);
      expect(arrayOld).toEqual(arrayOld);
    });

    it('should return a new array with the old item updated if the new item\'s id matches', () =>{
      const newItem = { id: "adsf", name:"tara"};
      
      const result = utils.appendOrUpdate(newItem, arrayOld);

      expect(result).toEqual(expect.arrayContaining([newItem]));
      expect(result.length).toEqual(2);
      expect(arrayOld).toEqual(arrayOld);
    });
  });

  // concat or update
  describe('concatOrUpdate', () => {
    it('should return a new array with new items appended if the items\' ids differ', () =>{
      const newItems = [
        { id: "jejh", name:"tara"},
        { id: "jenh", name:"rob"}
      ];
      
      const result = utils.concatOrUpdate(newItems, arrayOld);

      expect(result).toEqual(expect.arrayContaining(arrayOld));
      expect(result).toEqual(expect.arrayContaining(newItems));
      expect(result.length).toEqual(4);
      expect(arrayOld).toEqual(arrayOld);
    });

    it('should return a new array with the old item updated if the new item\'s id matches', () =>{
      const newItems = [
        { id: "adsf", name:"tara"},
        { id: "jenh", name:"rob"}
      ];
      
      const result = utils.concatOrUpdate(newItems, arrayOld);

      expect(result).toEqual(expect.arrayContaining(newItems));
      expect(result.length).toEqual(3);
      expect(arrayOld).toEqual(arrayOld);
    });
  });

  describe('generateSet', () => {
    it ('should generate a set', () => {
      const inputA = [1,2];
      const inputB = [2,3];
      const expected = [1,2,3];
      
      const result = utils.generateSet(inputA, inputB);
      expect(result).toEqual(expected);
    })

    it ('should generate a set', () => {
      const inputA = [1,2,3];
      const inputB = 2;
      const inputC = 4;
      const expected = [1,2,3,4];
      
      const result = utils.generateSet(inputA, inputB, inputC);
      expect(result).toEqual(expected);
    })
  })
})