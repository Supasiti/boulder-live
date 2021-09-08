//
// save new problems entered by user
//
const saveProblems = async (event) => {
  // make sure that it is 'Save' button is clicked
  if (event.target.id !== 'saveProblemBtn') return
  event.preventDefault();

  const extractInputs = (cells) => {
    return cells.reduce((acc, cell) => {
      const key = cell.getAttribute('name');
      const value = cell.value.trim();
      const result = {...acc, [key]: value};
      return result;
    }, {});
  };

  const createProblemData = (input, eventId) => {
    return { 
      name: input.name,
      eventId
    }
  }

  // extract data from each row
  // return Object data for problem
  const getProblemData = (row, eventId) => {
    // this row is the original data - need to ignore
    if (row.hasAttribute('data-problem-id')) return null;

    const inputCells = [...row.querySelectorAll('input')];
    const inputObject = extractInputs(inputCells)
    return createProblemData(inputObject, eventId)
  };

  // ----------------
  // combine 

  const eventId = getEventId();
  const tableBody = event.target.closest('form').querySelector('tbody');
  const tableRows = tableBody.querySelectorAll('tr');
  const problemData = [...tableRows]
    .map((row) => getProblemData(row, eventId))
    .filter((item) => item)
  
  const response = await fetch('/api/problems', {
    method: 'POST',
    body: JSON.stringify( problemData ),
    headers: { 'Content-Type': 'application/json' },
  });  

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to save problems');
  }
}

document
  .getElementById('problemForm')
  .addEventListener('click', saveProblems)

