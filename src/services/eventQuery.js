// interact with event database with functionalities:
// - create
// - read
const uuidv4 = require('uuid').v4();
const { getObjectsFromDb } = require('../models/dbUtils');

const dbFilePath = './src/models/event.json';

// create new Note
const eventFactory = ({title, start, end, location}) => {
  return {
    title: title,
    start: start,
    end: end,
    location: location,
    id: uuidv4(),
  };
};

// get all events
const getAllEvents = () => {
  return getObjectsFromDb(dbFilePath);
}


module.exports = {
  getAllEvents
}
