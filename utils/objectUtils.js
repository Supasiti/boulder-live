const withoutProperty = (obj, key) => {
  const {[key]: deletedValue, ... newObj} = obj;
  return newObj;
} 


module.exports = {
  withoutProperty
}