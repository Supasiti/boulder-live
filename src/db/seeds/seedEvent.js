const models = require('../../models');

const data = [
  {
    name: 'Boulder Together',
    location: 'Crux Bouldering',
    status: 'running',
  },
  {
    name: 'Boulder Cup',
    location: 'Blochaus',
    status: 'open',
  },
];

const seedEvent = () => models.Event.bulkCreate(data);

module.exports = seedEvent;
