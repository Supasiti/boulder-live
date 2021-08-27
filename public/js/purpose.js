
// handle organise
const handleSelectPurpose = async (event) => {
  event.preventDefault();

  const btn = event.target.closest('button');
  const selectedPurpose = btn.dataset.purpose;

  const response = await fetch('/api/users/purpose', {
    method: 'POST',
    body: JSON.stringify({ purpose: selectedPurpose }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    document.location.reload();
  }
}

document.querySelector('#compete-btn')
  .addEventListener('click', handleSelectPurpose);
document.querySelector('#organise-btn')
  .addEventListener('click', handleSelectPurpose);