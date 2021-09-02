
const saveCategories = async (event) => {
  // make sure that it is 'Save' button is clicked
  if (event.target.id !== 'saveEventBtn') return
  event.preventDefault();

  const parseDate = (dateStr, timeStr) => {
    // it is better to split the string instead of passing them directly
    const [year, month, day] = dateStr.split('-');
    const [hour, minute] = timeStr.split(':');
    const result = new Date(year, month-1, day, hour, minute, 0);
    return result;
  }

  const createCategoryData = (input, eventId) => {
    return { 
      name: input.name,
      start: parseDate(input.start_date, input.start_time),
      end: parseDate(input.end_date, input.end_time),
      eventId
    }
  }

  const extractInputsFromCells = (cells) => {
    return cells.reduce((acc, cell) => {
      const key = cell.getAttribute('name');
      const value = cell.value.trim();
      const result = {...acc, [key]: value};
      return result;
    }, {});
  };

  // extract data from each row
  // return Object data for category
  const getNewCategoryData = (row, eventId) => {
    // this row is the original data - need to ignore
    if (row.hasAttribute('data-categoryid')) return null;

    const inputCells = [...row.querySelectorAll('input')];
    const inputObject = extractInputsFromCells(inputCells)
    return createCategoryData(inputObject, eventId)
  };

  const getData = (event, eventId) => {
    const tableBody = event.target.closest('form').querySelector('tbody');
    const tableRows = tableBody.querySelectorAll('tr');
    const result = [...tableRows]
      .map((row) => getNewCategoryData(row, eventId))
      .filter((item) => item );
    return result;
  }

  // ----------------
  // combine 

  const eventId = getEventId();
  const categoryData = getData(event, eventId);

  const response = await fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify( categoryData ),
    headers: { 'Content-Type': 'application/json' },
  });  

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to save categories');
  }
}

document
  .getElementById('categoryForm')
  .addEventListener('click', saveCategories)