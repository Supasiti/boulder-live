const models = require('../models');
const { filterObjectByKeys } = require('../../utils/objectUtils');

const acceptedKeys = ['id'];
const assocModels = {
  organised_by: { model: models.Organiser, field: 'userId' },
  competed_in: { model: models.Competitor, field: 'userId' },
};

const getEventFilter = (rawFilter) => {
  const result = filterObjectByKeys(acceptedKeys, rawFilter);
  return result;
};

const getQueryObject = (key, rawFilter) => {
  if (key in rawFilter) {
    const filterObj = { [assocModels[key].field]: rawFilter[key] };
    const result = {
      model: assocModels[key].model,
      where: filterObj,
    };
    return result;
  }
  return null;
};

const getAssocFilters = (rawFilter) => {
  const assocKeys = Object.keys(assocModels);
  const result = assocKeys.reduce((acc, key) => {
    const toInclude = getQueryObject(key, rawFilter);
    return toInclude ? [...acc, toInclude] : [...acc];
  }, []);
  return result;
};

// filter the courses according to some filters and return ids
// return Array<int>
const getFilteredIds = async (rawFilter) => {
  const eventFilter = getEventFilter(rawFilter);
  const assocFilters = getAssocFilters(rawFilter);

  const events = await models.Event.findAll({
    attributes: ['id'],
    where: eventFilter,
    include: assocFilters,
  });
  return events.map(({ id }) => id);
};

//-------------------------------------
// get all events with basic details
// return
//  - Array<Event>
const getAllEvents = async (rawFilter) => {
  const ids = await getFilteredIds(rawFilter);
  const result = await models.Event.findAll({
    where: { id: ids },
  });
  return result;
};

module.exports = getAllEvents;
