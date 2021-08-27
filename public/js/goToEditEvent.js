const eventTables = document.querySelectorAll('.table');


const cancelEvent = (event) => {
  console.log('cancelling event ...') // TODO...
  event.stopImmediatePropagation();
}

const goToEditEventPage = (event) => {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON'){
    cancelEvent(event);
    return
  }

  const tableRow = event.target.closest('tr');
  const eventId = tableRow.dataset.eventid;
  document.location.replace(`/events/${eventId}`);
}

eventTables.forEach((table) => table.addEventListener('click', goToEditEventPage));