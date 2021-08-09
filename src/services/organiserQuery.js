// interact with event database with functionalities:
// - create
// - read
const { getObjectsFromDb } = require('../models/dbUtils');
const { writeToFile } = require('../models/fsUtils');
const { appendOrUpdate } = require('./arrayUtils');
const organiser = require('./organiser');

const organiserDbFilePath = './src/models/organiser.json';

// save organiser if new
// return undefined if operation fails or new organiser object
const saveOrganiserIfNew = (newOrganiser, current) => {
  const emails = current.map((organiser) => organiser.email);
  if (emails.includes(newOrganiser.email)) return undefined;

  const newOrganisers = appendOrUpdate(newOrganiser, current);
  writeToFile(organiserDbFilePath, newOrganisers)
  return newOrganiser;
}

// save organiser
const saveOrganiser = ({username, email, password}) => {
  const newOrganiser = organiser.create({username, email, password});
  return getObjectsFromDb(organiserDbFilePath)
    .then((current) => saveOrganiserIfNew(newOrganiser, current))
    .catch(console.error)
};

// ---------------------------------------------------------------------------------------
// get an organiser by email or return undefined
const getOrganiserByEmail = (email, organisers) => {
  return organisers.find((organiser) => organiser.email === email)
}

// return organiser's id if password is correct
const validatePassword = (entered, organiser) => {
  if (organiser) {
    return entered === organiser.password? organiser.id : undefined;
  }
  return undefined;
}

// return organiser's id if it is tote regit,
// otherwise undefined
const authenticateOrganiser = (email, password) => {
  return getObjectsFromDb(organiserDbFilePath)
    .then((organisers) => getOrganiserByEmail(email, organisers))
    .then((organiser) => validatePassword(password, organiser));
}

// ---------------------------------------------------------------------------------------

// return an organiser without password 
const getOrganiserById = (id) => {
  return getObjectsFromDb(organiserDbFilePath)
    .then((organisers) => organisers.find((organiser) => organiser.id === id))
}


module.exports = {
  saveOrganiser,
  authenticateOrganiser,
  getOrganiserById
}