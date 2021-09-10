const models = require('../models');
const { filterObjectByKeys } = require('../../utils/objectUtils');

//-----------------------------------------------------
const acceptedKeys = ['id'];
const assocModels = {
  organised_by: { model: models.Organiser, field: 'userId' },
  competed_in: { model: models.Competitor, field: 'userId' },
};

const getEventFilter = (rawFilter) => {
  const result = filterObjectByKeys(acceptedKeys, rawFilter);
  return result;
};

const getAssocFilters = (rawFilter) => {
  const assocKeys = Object.keys(assocModels);
  const result = assocKeys.reduce((acc, key) => {
    if (key in rawFilter) {
      const filterObj = { [assocModels[key].field]: rawFilter[key] };
      const toInclude = {
        model: assocModels[key].model,
        where: filterObj,
      };
      return [...acc, toInclude];
    }
    return [...acc];
  }, []);
  return result;
};

// filter the courses according to some filters and return ids
// return Array<int>
const getFilteredIds = async (rawFilter) => {
  const eventFilter = getEventFilter(rawFilter);
  const assocFilters = getAssocFilters(rawFilter);
  try {
    const events = await models.Event.findAll({
      attributes: ['id'],
      where: eventFilter,
      include: assocFilters,
    });
    return events.map(({ id }) => id);
  } catch (err) {
    console.error(err);
  }
};

// get all events with basic details
// return
//  - Array<Event>
const allxxx = async (rawFilter) => {
  const ids = await getFilteredIds(rawFilter);
  const result = await models.Event.findAll({
    where: { id: ids },
  });
  return result;
};
//-----------------------------------------------------

// get all event - with categories
// return
//  - Array<Event>
const all = async () => {
  const eventData = await models.Event.findAll({
    include: [models.Category],
  });
  return eventData;
};

// get all events with a set of ids
// return
//  - Array<Event>
const byIds = async (eventIds) => {
  const result = await models.Event.findAll({
    where: { id: eventIds },
  });
  return result;
};

// get an event with an id
// return
//  - Event
const byId = async (eventId) => {
  const result = await models.Event.findOne({
    where: { id: eventId },
    include: { model: models.Category },
  });
  return result;
};

// get all event organised by a user
// return
//  - Array<Event>
const organisedByUser = async (userId) => {
  const organisers = await models.Organiser.findAll({
    attributes: ['eventId'],
    where: { userId: userId },
  });
  const eventIds = organisers.map((o) => o.eventId);
  const result = await byIds(eventIds);
  return result;
};

// get all event competed by a user
// return
//  - Array<Object>
const competedByUser = async (userId) => {
  const competitors = await models.Competitor.findAll({
    attributes: ['eventId'],
    where: { userId: userId },
  });
  const eventIds = competitors.map((o) => o.eventId);
  const result = await byIds(eventIds);
  return result;
};

module.exports = {
  allxxx,
  all,
  byId,
  byIds,
  organisedByUser,
  competedByUser,
};
