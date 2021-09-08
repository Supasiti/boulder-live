const format_time = (date) => {
  if (date instanceof Date) {
    const newDate = date;
    return newDate.toLocaleTimeString();
  } 
  return '';
};

const format_date = (date) => {
  if (date instanceof Date) {
    const newDate = date;
    return newDate.toLocaleDateString();
  } 
  return '';
};

const capitalise = (str) => {
  const result = str[0].toUpperCase() + str.substr(1);
  return result;
}

const booleanToTick = (truthy) => {
  if (truthy) return "✅";
  return ""
}

module.exports = {
  format_time,
  format_date,
  capitalise,
  booleanToTick
};
