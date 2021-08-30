
// cancel event and reload the page
const cancelEvent = async (event) => {
  event.preventDefault();

  
  const eventId = getEventId;
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