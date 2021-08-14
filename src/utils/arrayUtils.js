

// append a new item to an array
const appendTo = (newItem, array) => [...array, newItem];

// append new item or update them based on ids
const appendOrUpdate = (newItem, array) => {
  const filtered = array.filter((item) => item.id !== newItem.id);
  return appendTo(newItem, filtered);
}

// append new item or update them based on ids
const concatOrUpdate = (newItems, array) => {
  const newIds = newItems.map((item) => item.id);
  const filtered = array.filter((item) => !newIds.includes(item.id));
  return filtered.concat(newItems);
}

module.exports = {
  appendTo,
  appendOrUpdate,
  concatOrUpdate
}