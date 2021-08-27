const eventTables = document.querySelectorAll('.table');


const cancelEvent = (event) => {
  console.log('cancelling event ...')
  event.stopImmediatePropagation();
}

const goToEditEventPage = (event) => {
  event.preventDefault();

  if (event.target.nodeName === 'BUTTON'){
    cancelEvent(event);
    return
  }

  // get event id...
  const tableRow = event.target.closest('tr');
  const eventId = tableRow.dataset.eventid;
  console.log(eventId); 
  document.location.replace(`/events/${eventId}`);
}


eventTables.forEach((table) => table.addEventListener('click', goToEditEventPage));