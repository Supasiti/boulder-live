// interact with event database with functionalities:
// - create
// - read
const { appendObjectToDb } = require('../models/dbUtils');
const event = require('./event');
const { saveOrganiserEvent } = require('./organiserEvent');

const eventDbFilePath = './src/models/event.json';

// ------------------------------------
//  SAVE
const saveEvent = ({organiserId, title, start, end, location}) => {
  const newEvent = event.create({title, start, end, location});
  // saveOrganiserEvent({organiserId, eventId: newEvent.id}); 
  return appendObjectToDb(newEvent, eventDbFilePath);
};


