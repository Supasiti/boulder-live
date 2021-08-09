// interact with event database with functionalities:
// - create
// - read
const { appendObjectToDb } = require('../models/dbUtils');
const organiserEvent = require('./organiserEvent');

const organiserEventDbFilePath = './src/models/organiser_event.json';

// ------------------------------------
//  SAVE
const saveOrganiserEvent = ({eventId, organiserId}) => {
  const newOrganiserEvent = organiserEvent.create({eventId, organiserId});


  
  return appendObjectToDb(newOrganiserEvent, organiserEventDbFilePath);
};



module.exports = {
  saveOrganiserEvent
}
