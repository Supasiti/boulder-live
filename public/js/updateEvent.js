
// update event and reload the page

// NOT FINISH !!!!!!!!!!!!

const updateEvent = async (event) => {
  event.preventDefault();

  const getData = (event) => {
    const form = event.target.closest('form');
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const allInputs = [...inputs].concat([...selects]);
    const result = allInputs.reduce((acc, input) => {
      const key = input.getAttribute('name');
      const value = input.value.trim();
      return value ? {...acc, [key]: value } : {...acc}
    }, {})
    return result;
  }

  const eventId = getEventId();
  const eventData = getData(event);

  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify( eventData ),
    headers: { 'Content-Type': 'application/json' },
  });  

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to update event');
  }
}

document.getElementById('eventForm').addEventListener('submit', updateEvent);