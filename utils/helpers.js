const format_time = (date) => {
  return date.toLocaleTimeString();
};

const format_date = (date) => {
  const newDate = date;
  return newDate.toLocaleDateString();
};

const capitalise = (str) => {
  const result = str[0].toUpperCase() + str.substr(1);
  return result;
}

module.exports = {
  format_time,
  format_date,
  capitalise
};
