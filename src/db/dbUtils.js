// interaction with database
//  - read
//  - append
//  - delete 
const { readFromFile, writeToFile} = require('./fsUtils');
const { appendOrUpdate, concatOrUpdate } = require('../services/arrayUtils')
 
// --------------------------------
//   READ

// read / get object from database
const getObjectsFromDb = (dbFilePath) => {
  return readFromFile(dbFilePath)
    .then(JSON.parse)
    .catch(console.error)
}

// ------------------------------------
//  CREATE / UPDATE


//  append new object to database
//  will update the object if it has a matching id
const appendObjectToDb = (newObj, dbFilePath) => {
  return getObjectsFromDb(dbFilePath)
    .then((current) => appendOrUpdate(newObj, current))
    .then((newObjs) => {writeToFile(dbFilePath, newObjs)})
    .catch(console.error)
}

// append an array of objects to database
// will update each object in the array with a matching id
const appendObjectsToDb = (array, dbFilePath) => {
  return getObjectsFromDb(dbFilePath)  
    .then((current) => concatOrUpdate(array, current))
    .then((newObjs) => {writeToFile(dbFilePath, newObjs)})
    .catch(console.error)
}


// return undefined if it can't find a note in a database otherwise it returns the deleted
// note and update the database 
const deleteObjectFromDbIfExists = (idToDelete, current, dbFilePath) => {
  const deleted = current.find((obj) => obj.id === idToDelete);
  const newObjs = current.filter((obj) => obj.id != idToDelete);
  if (deleted) writeToFile(dbFilePath, newObjs);
  return deleted;
};


// ------------------------------------
//  DELETE

// delete note from a database if it exists
const deleteObjectFromDb = (id, dbFilePath) => {
  return getObjectsFromDb(dbFilePath)
    .then((objs) => deleteObjectFromDbIfExists(id, objs, dbFilePath))
    .catch(console.error)
};



module.exports = {
  getObjectsFromDb,
  appendObjectToDb,
  appendObjectsToDb,
  deleteObjectFromDb
}