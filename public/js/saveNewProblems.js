
const handleSaveProblems = async (event) => {
  // make sure that it is 'Save' button is clicked
  if (event.target.innerText !== 'Save') return
  event.preventDefault();


  const extractInputsFromCells = (cells) => {
    return cells.reduce((acc, cell) => {
      const key = cell.getAttribute('data-input');
      const value = cell.value.trim();
      const result = {...acc, [key]: value};
      return result;
    }, {});
  };

  const getProblemDataFromInput = (input, eventId) => {
    return { 
      name: input.name,
      eventId
    }
  }

  // extract data from each row
  // return Object data for problem
  const getNewProblemData = (row, eventId) => {
    // this row is the original data - need to ignore
    if (row.hasAttribute('data-problem-id')) return null;

    const inputCells = [...row.querySelectorAll('input')];
    const inputObject = extractInputsFromCells(inputCells)
    return getProblemDataFromInput(inputObject, eventId)
  };

  // ----------------
  // combine 

  const eventId = getEventId();
  const tableBody = event.target.closest('form').querySelector('tbody');
  const tableRows = tableBody.querySelectorAll('tr');
  const problemData = [...tableRows]
    .map((row) => getNewProblemData(row, eventId))
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



// set up it 
const setUpProblemForm = () => {
  const form = document.querySelector('#event-problem-form');
  form.addEventListener('click', handleSaveProblems)
}

setUpProblemForm();