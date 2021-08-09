// interact with event database with functionalities:
// - create
// - read
const uuidv4 = require('uuid').v4();
const { getObjectsFromDb } = require('../models/dbUtils');

const eventDbFilePath = './src/models/event.json';
const organisrEventDbFilePath = './src/models/organiser_event.json';

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

// get event filtered by organisers
const getAllEventsByOrganiser = (organiser) => {
  
}


module.exports = {
  getAllEvents
}
