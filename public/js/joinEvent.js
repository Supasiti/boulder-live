
const withdrawFromEvent = async (event) => {
  event.preventDefault();
  event.stopPropagation(); // stop bubbling

   // do something

  // const tableRow = event.target.closest('tr');
  // const eventId = tableRow.getAttribute('data-eventid');
  // const eventData = { status: 'cancelled' };

  // const response = await fetch(`/api/events/${eventId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify( eventData ),
  //   headers: { 'Content-Type': 'application/json' },
  // });  

  // if (response.ok) {
  //   document.location.reload();
  // } else {
  //   alert('Failed to cancel event');
  // }
}

// join an event
const joinEvent = async (event) => {
  event.preventDefault();

  const isWithdrawButton = (element) => {
    return element.nodeName === 'BUTTON' && 
    element.innerText.toLowerCase() === 'withdraw' 
  }

  if (isWithdrawButton(event.target)){
    await withdrawFromEvent(event);
    return
  }

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
  .forEach((table) => table.addEventListener('click', joinEvent));