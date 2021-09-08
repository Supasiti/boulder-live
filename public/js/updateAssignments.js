
const updateAssignments = async (event) => {
  // make sure that it is 'Save' button is clicked
  if (event.target.id !== 'saveAssignmentBtn') return
  event.preventDefault();

  // extract inputs from UI
  const getAssignmentData = (event) => { 
    const form = event.target.closest('form');
    const inputs = form.querySelectorAll('input');
    const checkedInputs = [...inputs].filter((input) => input.checked);
    const result = checkedInputs.map((input) => {
      const problemId = parseInt(input.getAttribute('data-problemId'));
      const categoryId = parseInt(input.getAttribute('data-categoryId'));
      return { problemId, categoryId };
    })
    return result;
  }

  const eventId = getEventId();
  const assignmentData = getAssignmentData(event);
  const response = await fetch('/api/problems/assign', {
    method: 'POST',
    body: JSON.stringify({ 
      eventId, 
      problemAssignments: assignmentData 
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to save categories');
  }
};

document
  .getElementById('assignmentForm')
  .addEventListener('click', updateAssignments)