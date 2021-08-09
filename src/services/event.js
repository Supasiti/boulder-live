const uuidv4 = require('uuid').v4;

// create new organiser
const create = ({title, start, end,location}) => {
  return {
    title: title,
    start: start,
    end: end,
    location: location,
    id: uuidv4()
  };
};

module.exports = {
  create
};