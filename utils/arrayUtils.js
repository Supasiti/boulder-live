

// append a new item to an array
// return
//  - Array<..>
const appendTo = (newItem, array) => [...array, newItem];

// append new item or update them based on ids
// return
//  - Array<..>
const appendOrUpdate = (newItem, array) => {
  const filtered = array.filter((item) => item.id !== newItem.id);
  return appendTo(newItem, filtered);
}

// append new item or update them based on ids
// return
//  - Array<..>
const concatOrUpdate = (newItems, array) => {
  const newIds = newItems.map((item) => item.id);
  const filtered = array.filter((item) => !newIds.includes(item.id));
  return filtered.concat(newItems);
}

// create a set from arrays of items/arrays
//  - need to use function due to scope of 'arguments'
// return 
//  - Array<..>
const generateSet = function () { 
  const duplicates = [].concat(...arguments);
  return duplicates.reduce((acc, cur) => {
    return acc.includes(cur)? [...acc] : [...acc, cur]
  }, []);
}

// create a set from arrays of items/arrays using ID
//  - need to use function due to scope of 'arguments'
// return 
//  - Array<..>
const generateSetById = function () { 
  const duplicates = [].concat(...arguments);
  return duplicates.reduce((acc, cur) => {
    const ids = acc.map(({ id }) => id);
    return ids.includes(cur.id)? [...acc] : [...acc, cur]
  }, []);
}

module.exports = {
  appendTo,
  appendOrUpdate,
  concatOrUpdate,
  generateSet,
  generateSetById
}