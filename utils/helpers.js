const format_time = (date) => {
  return date.toLocaleTimeString();
};

const format_date = (date) => {
  const newDate = date;
  return newDate.toLocaleDateString();
};

module.exports = {
  format_time,
  format_date
};
