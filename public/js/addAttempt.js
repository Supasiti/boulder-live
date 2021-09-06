// add top to the score
const addAttempt = async (event) => {
  event.preventDefault();

  console.log('add attempt')

  const tr = event.target.closest('tr');
  const scoreId = parseInt(tr.getAttribute('data-score-id'));

  const response = await fetch(`/api/scores/${scoreId}/addattempt`, {
    method: 'POST',
    body: '',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to update');
  }
}

document.querySelectorAll('.btn-add-attempt').forEach((btn) => {
  btn.addEventListener('mouseup', addAttempt);
})