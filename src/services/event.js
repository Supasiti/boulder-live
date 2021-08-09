// interact with event database with functionalities:
// - create
// - read
const uuidv4 = require('uuid').v4();

const {readFromFile, writeToFile} = require('../models/fsUtils');
const dbFilePath = '../models/event.json';

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







// return undefined if it can't find a note in a database otherwise it returns the deleted
// note and update the database 
const deleteNoteFromDbIfExists = (idToDelete, currentNotes) => {
  const deleted = currentNotes.find((note) => note.id === idToDelete);
  const newNotes = currentNotes.filter((note) => note.id != idToDelete);
  if (deleted) writeToFile(dbFilePath, newNotes);
  return deleted;
};

// delete note from a database if it exists
const deleteNoteFromDb = (id) => {
  return getNotesFromDb()
    .then((notes) => deleteNoteFromDbIfExists(id, notes))
    .catch(console.error)
};


module.exports = {
  noteFactory,
  getNotesFromDb,
  appendNoteToDb,
  deleteNoteFromDb
}