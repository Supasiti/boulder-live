// get the data to render

const getEventData = async () => {
  // expect .../eventId
  const getEventId = () => {
    const path = document.location.href.split('?')[0];
    const routes = path.split('/');
    const result = routes[routes.length - 1];
    return result;
  };

  const eventId = getEventId();
  const response = await fetch(`/api/events/${eventId}`);
  const eventData = response.json();
  return eventData;
};

// render the table
const renderAssignmentTable = async (eventData) => {
  const categoryIds = eventData.categories.map(({ id }) => id);
  const { problems, assignments } = eventData;

  // check if it is in problem assignment
  const isChecked = (problemId, categoryId, problemAssignments) => {
    const entry = problemAssignments.find((assignment) => {
      return (
        assignment.problemId === problemId &&
        assignment.categoryId === categoryId
      );
    });
    return entry ? true : false;
  };

  // append a check box cell
  const createRow = (problem, categoryIds, problemAssignments) => {
    const rowEl = document.createElement('tr');
    const headerEl = document.createElement('th');
    headerEl.setAttribute('scope', 'row');
    headerEl.innerText = problem.name;
    rowEl.appendChild(headerEl);

    categoryIds.forEach((categoryId) => {
      const checked = isChecked(
        problem.id,
        categoryId,
        problemAssignments,
      );
      const cellEl = document.createElement('td');
      cellEl.classList = 'text-center';
      cellEl.innerHTML = checked
        ? `
        <input class="form-check-input" type="checkbox"  
          data-problemId="${problem.id}" data-categoryId="${categoryId}" checked>
      `
        : `
        <input class="form-check-input" type="checkbox"   
          data-problemId="${problem.id}" data-categoryId="${categoryId}">
      `;
      rowEl.appendChild(cellEl);
    });
    return rowEl;
  };

  const form = document.getElementById('assignmentForm');
  const tableBody = form.querySelector('tbody');

  problems.map((problem) => {
    const rowEl = createRow(problem, categoryIds, assignments);
    tableBody.appendChild(rowEl);
  });
};

getEventData()
  .then((eventData) => renderAssignmentTable(eventData))
  .catch(console.error);
