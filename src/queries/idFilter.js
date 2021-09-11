const { filterObjectByKeys } = require('../../utils/objectUtils');

// from incoming filter create a query object for based on  accepted keys
// return - { key: value }
const getModelFilter = (rawFilter, acceptedKeys) => {
  const result = filterObjectByKeys(acceptedKeys, rawFilter);
  return result;
};

//-------------------------------------

// create a query object
// return Object
// {
//   model: [Model],
//   where: { [searchKey], value }
// }
const getQueryObject = (key, rawFilter, assocModels) => {
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

// create an array of  query objects for all associated models
// expect assocModels of form:
//  {
//   key: { model: [Model], field: [searchKey] (string) }}
//  }
// return Array<QueryObject>
const getAssocFilters = (rawFilter, assocModels) => {
  const assocKeys = Object.keys(assocModels);
  const result = assocKeys.reduce((acc, key) => {
    const toInclude = getQueryObject(key, rawFilter, assocModels);
    return toInclude ? [...acc, toInclude] : [...acc];
  }, []);
  return result;
};

// filter the courses according to some filters and return ids
// argument :
//  - rawFilter (Object) : { keys: values}
//  - model : Model
//  - acceptsKeys: Array<String>
//  - assocModels: see getAssocFilters
// return Array<int>
const getFilteredIds = async (
  rawFilter,
  model,
  acceptedKeys,
  assocModels,
) => {
  const eventFilter = getModelFilter(rawFilter, acceptedKeys);
  const assocFilters = getAssocFilters(rawFilter, assocModels);

  const events = await model.findAll({
    attributes: ['id'],
    where: eventFilter,
    include: assocFilters,
  });
  return events.map(({ id }) => id);
};

const idFilterFactory = (model, acceptedKeys, assocModels) => {
  const _acceptedKeys = acceptedKeys;
  const _model = model;
  const _assocModels = assocModels;

  return {
    getIds: (rawFilter) =>
      getFilteredIds(rawFilter, _model, _acceptedKeys, _assocModels),
  };
};

module.exports = idFilterFactory;
