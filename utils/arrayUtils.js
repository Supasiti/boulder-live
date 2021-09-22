// mapping an array to a property in each item
// return Array
const mapToKey = (array, key) => {
  const result = array.map((a) => a[key]);
  return result;
};

// simple filter array by checking if key == value
// arguments:
//  - array: Array
//  - key : string
//  - value: Any
// return Array
const filterByKey = (array, key, value) => {
  const result = array.filter((a) => a[key] === value);
  return result;
};

module.exports = {
  mapToKey,
  filterByKey,
};
