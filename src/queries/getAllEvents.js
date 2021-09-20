const models = require('../models');
const idFilterFactory = require('./idFilter');

const acceptedKeys = ['id', 'status'];
const assocModels = {
  organised_by: { model: models.Organiser, field: 'userId' },
  competed_by: { model: models.Competitor, field: 'userId' },
};

const getAllEventsWithFilter = async (rawFilter) => {
  const idFilter = idFilterFactory(
    models.Event,
    acceptedKeys,
    assocModels,
  );
  const ids = await idFilter.getIds(rawFilter);
  const result = await models.Event.findAll({
    where: { id: ids },
  });
  return result;
};

//-------------------------------------
// get all events with basic details
// return
//  - Array<Event>
const getAllEvents = async (rawFilter) => {
  if (rawFilter) {
    const result = await getAllEventsWithFilter(rawFilter);
    return result;
  }
  const result = await models.Event.find({})
    .lean()
    .catch((err) => console.error(err));
  return result;
};

module.exports = getAllEvents;
