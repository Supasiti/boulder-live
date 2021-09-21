// mapping an array to a property in each item
// return Array
const mapKey = (array, key) => {
  const result = array.map((a) => a[key]);
  return result;
};

module.exports = {
  mapKey,
};
