

// go to edit event page
const goToCompetitorEvent = async (event) => {
  event.preventDefault();

  const tableRow = event.target.closest('tr');
  const eventId = tableRow.getAttribute('data-eventid');
  if (!eventId) return

  const response = await fetch(`/api/events/${eventId}/join`, {
    method: 'POST',
    body: "",
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/events/${eventId}`);
  } else {
    alert('Failed to join the event');
  }
}

document
  .querySelectorAll('.table')
  .forEach((table) => table.addEventListener('click', goToCompetitorEvent));