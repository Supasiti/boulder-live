

// go to edit event page
const goToCompetitorEvent = async (event) => {
  event.preventDefault();

  const tableRow = event.target.closest('tr');
  const eventId = tableRow.getAttribute('data-eventid');
  if (!eventId) return
  document.location.replace(`/events/${eventId}`);
}

document
  .querySelectorAll('.table')
  .forEach((table) => table.addEventListener('click', goToCompetitorEvent));