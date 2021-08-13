const helpers = require('../models/fsUtils');
const {
  getObjectsFromDb,
  appendObjectToDb,
  appendObjectsToDb,
  deleteObjectFromDb
} = require('../models/dbUtils');
const {concatOrUpdate} = require('../services/arrayUtils')

jest.mock('../models/fsUtils');

const mockData = `[
  {
    "title" : "My cat",
    "text" : "is cuter",
    "id" : "1e90"
  },
  {
    "title" : "My dog",
    "text" : "to clean him today",
    "id" : "2d90"
  }
]`;

const mockArray = [
  {
    title: "My cat",
    text: "is cuter",
    id: "1e90"
  },
  {
    title: "My dog",
    text: "to clean him today",
    id: "2d90"
  }
];

describe('../models/dbUtils.js', () => {


  // get notes from db
  describe('getObjectsFromDb', () => {
    it('should return a list of objects', () => {
      helpers.readFromFile.mockImplementation(() => Promise.resolve(mockData));

      const result = getObjectsFromDb();

      expect(result).resolves.toHaveLength(mockArray.length);
      expect(result).resolves.toEqual(expect.arrayContaining(mockArray));
      helpers.readFromFile.mockRestore();
    });
  });

  // append object to database
  describe('appendObjectToDb', () => {
    it('should append an object and write it to the database', () => {
      helpers.readFromFile.mockImplementation(() => Promise.resolve(mockData));
      helpers.writeToFile.mockImplementation(() => Promise.resolve());

      const input = { title: "Vaccine", text:"book appointment", id:"badb"};
      const expectedArray = [...mockArray, input];
      const dbFilePath = './db/db.json'

      appendObjectToDb(input, dbFilePath)
        .then( () => {
          expect(helpers.writeToFile).toHaveBeenCalledWith(dbFilePath, expectedArray);
          helpers.readFromFile.mockRestore();
          helpers.writeToFile.mockRestore();
        })
    });
  });

  // append objects to database
  describe('appendObjectsToDb', () => {
    it('should append/update objects and write it to the database', () => {
      helpers.readFromFile.mockImplementation(() => Promise.resolve(mockData));
      helpers.writeToFile.mockImplementation(() => Promise.resolve());

      const input = [
        { title: "Vaccine", text:"book appointment", id:"badb"},
        { title: "Exercise", text:"go running", id:"1e90"},
      ];
      const expectedArray = concatOrUpdate(input, mockArray);
      const dbFilePath = './db/db.json'

      appendObjectsToDb(input, dbFilePath)
        .then( () => {
          expect(helpers.writeToFile).toHaveBeenCalledWith(dbFilePath, expectedArray);
          helpers.readFromFile.mockRestore();
          helpers.writeToFile.mockRestore();
        })
    });
  });

  // delete note from database
  describe('deleteNoteFromDb', () => {

    // if the id exists
    it('should delete a note from database if exists', () => {
      helpers.readFromFile.mockImplementation(() => Promise.resolve(mockData));
      helpers.writeToFile.mockImplementation(() => Promise.resolve());

      const input = "2d90";
      const expectedArray = mockArray.filter((item) => item.id != input);
      const dbFilePath = './db/db.json'
      const expected = {
        title: "My dog",
        text: "to clean him today",
        id: "2d90"
      };

      deleteObjectFromDb(input, dbFilePath)
        .then( (result) => {
          expect(helpers.writeToFile).toHaveBeenCalledWith(dbFilePath, expectedArray);
          expect(result).toEqual(expected);

          helpers.readFromFile.mockRestore();
          helpers.writeToFile.mockRestore();
        })
    });

    // if the id does not exist
    it('should do nothing and return undefined if the id does not exist', () => {
      helpers.readFromFile.mockImplementation(() => Promise.resolve(mockData));
      helpers.writeToFile.mockImplementation(() => Promise.resolve());

      const input = "2db0";
      const dbFilePath = './db/db.json'
      const expected = undefined;

      deleteObjectFromDb(input, dbFilePath)
        .then( (result) => {
          expect(helpers.writeToFile).not.toHaveBeenCalled();
          expect(result).toEqual(expected);

          helpers.readFromFile.mockRestore();
          helpers.writeToFile.mockRestore();
        })
    });
  });

});