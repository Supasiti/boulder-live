const withoutProperty = (obj, key) => {
  const { [key]: deletedValue, ...newObj } = obj;
  return newObj;
};

const filterObjectByKeys = (acceptedKeys, obj) => {
  const result = acceptedKeys.reduce((acc, key) => {
    return key in obj ? { ...acc, [key]: obj[key] } : { ...acc };
  }, {});
  return result;
};

module.exports = {
  withoutProperty,
  filterObjectByKeys,
};
