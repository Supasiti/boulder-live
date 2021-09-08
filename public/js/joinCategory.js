// go to edit event page
const joinCategory = async (event) => {
  event.preventDefault();

  const isJoinButton = (element) => {
    return element.nodeName === 'BUTTON' && element.innerText === 'Join';
  }
  if (!isJoinButton(event.target)) return

  const tableRow = event.target.closest('tr');
  const categoryId = tableRow.getAttribute('data-categoryid');
  if (!categoryId) return

  const response = await fetch(`/api/categories/${categoryId}/join`, {
    method: 'POST',
    body: "",
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to join a category');
  }
}

document
  .getElementById('availableCategoryTable')
  .addEventListener('click', joinCategory);