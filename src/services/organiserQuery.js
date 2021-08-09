// interact with event database with functionalities:
// - create
// - read
const uuidv4 = require('uuid').v4;
const { getObjectsFromDb } = require('../models/dbUtils');
const { writeToFile } = require('../models/fsUtils');
const { appendOrUpdate } = require('./arrayUtils');

const organiserDbFilePath = './src/models/organiser.json';

// create new organiser
const organiserFactory = ({username, email, password}) => {
  return {
    username: username,
    email: email,
    password: password,
    id: uuidv4(),
  };
};

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
  const newOrganiser = organiserFactory({username, email, password});
  return getObjectsFromDb(organiserDbFilePath)
    .then((current) => saveOrganiserIfNew(newOrganiser, current))
    .catch(console.error)
};

// get an organiser by email or return undefined
const getOrganiserByEmail = (email) => {
  return getObjectsFromDb(organiserDbFilePath)
    .then((organisers) => organisers.find((organiser) => organiser.email === email))
}


module.exports = {
  saveOrganiser,
  getOrganiserByEmail
}