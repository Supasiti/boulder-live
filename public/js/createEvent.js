
const createEventAndGoToIt = async (event) => {
  event.preventDefault();

  const getInputs = (event) => {

    const modalContent = event.target.closest('.modal-content');
    const inputs = modalContent.querySelectorAll('input');
    const result = [...inputs].reduce((acc, input) => {
      const key = input.getAttribute('data-input');
      const value = input.value.trim();
      return value ? {...acc, [key]: value } : {...acc};
    }, {})
    return result;
  }

  const eventData = getInputs(event);
  const response = await fetch('/api/events/create', {
    method: 'POST',
    body: JSON.stringify( eventData ),
    headers: { 'Content-Type': 'application/json' },
  });  

  if (response.ok) {
    const data = await response.json();
    document.location.replace(`/events/${data.id}`);
  } else {
    alert('Failed to save events');
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  document
  .getElementById('create-event-btn')
  .addEventListener('click', createEventAndGoToIt)
});
