// add top to the score
const addTop = async (event) => {
  event.preventDefault();

  const tr = event.target.closest('tr');
  const scoreId = parseInt(tr.getAttribute('data-score-id'));

  const response = await fetch(`/api/scores/${scoreId}/addtop`, {
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

document.querySelectorAll('.btn-add-top').forEach((btn) => {
  btn.addEventListener('mouseup', addTop);
})