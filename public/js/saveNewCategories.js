
const handleSaveCategories = async (event) => {
  // make sure that it is 'Save' button is clicked
  if (event.target.innerText !== 'Save') return
  event.preventDefault();

  const parseDate = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split('-');
    const [hour, minute] = timeStr.split(':');
    const result = new Date(year, month-1, day, hour, minute, 0);
    return result;
  }

  // expect .../eventId
  const getEventId = () => {
    const path = document.location.href.split('?')[0];
    const routes = path.split('/');
    const result = routes[routes.length - 1];
    return result;
  }

  // extract data from each row
  // return Object data for category
  const getNewCategoryData = (row, eventId) => {
    // this row is the original data - need to ignore
    if (row.hasAttribute('data-categoryid')) return null;

    const inputCells = [...row.querySelectorAll('input')];
    const inputObject = inputCells.reduce((acc, cell) => {
      const key = cell.getAttribute('data-input');
      const value = cell.value.trim();
      const result = {...acc, [key]: value};
      return result;
    }, {})
    const result = { 
      name: inputObject.name,
      start: parseDate(inputObject.start_date, inputObject.start_time),
      end: parseDate(inputObject.end_date, inputObject.end_time),
      eventId
    }
    return result;
  };

  const eventId = getEventId();
  const tableBody = event.target.closest('form').querySelector('tbody');
  const tableRows = tableBody.querySelectorAll('tr');
  const categoryData = [...tableRows]
    .map((row) => getNewCategoryData(row, eventId))
    .filter((item) => item );
  
  console.log(categoryData);

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

// set up it 
const setUpCategoryForm = () => {
  const form = document.querySelector('#event-category-form');
  form.addEventListener('click', handleSaveCategories)
}

setUpCategoryForm();