
// cancel event and reload the page
const cancelEvent = async (event) => {
  event.preventDefault();
  event.stopPropagation(); // stop bubbling

  const tableRow = event.target.closest('tr');
  const eventId = tableRow.getAttribute('data-eventid');
  const eventData = { status: 'cancelled' };

  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify( eventData ),
    headers: { 'Content-Type': 'application/json' },
  });  

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to cancel event');
  }
}

// go to edit event page
const goToEditEventPage = async (event) => {
  event.preventDefault();

  const isCancelButton = (element) => {
    return element.nodeName === 'BUTTON' && 
    element.innerText.toLowerCase() === 'cancel' 
  }

  if (isCancelButton(event.target)){
    await cancelEvent(event);
    return
  }

  const tableRow = event.target.closest('tr');
  const eventId = tableRow.getAttribute('data-eventid');
  if (!eventId) return
  document.location.replace(`/events/${eventId}`);
}

document
  .querySelectorAll('.table')
  .forEach((table) => table.addEventListener('click', goToEditEventPage));