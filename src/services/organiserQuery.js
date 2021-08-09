// interact with event database with functionalities:
// - create
// - read
const uuidv4 = require('uuid').v4;
const { 
  getObjectsFromDb,
  appendObjectToDb 
} = require('../models/dbUtils');

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

// save organiser
const saveOrganiser = ({username, email, password}) => {
  const newOrganiser = organiserFactory({username, email, password});
  appendObjectToDb(newOrganiser, organiserDbFilePath)
  return newOrganiser;
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