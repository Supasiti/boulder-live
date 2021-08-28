const btnAddCategoryTableRow = document.querySelector('#btn-add-category-table-row');

const addCategoryTableRow = (event) => {
  event.preventDefault();

  // delete table row
  const deleteTableRow = (event) => {
    event.preventDefault();
    const tableRow = event.target.closest('tr');
    tableRow.remove();
  }

  // create delele button cell
  const createDeleteBtnCell = () => {
    const tableCell = document.createElement('td');
    tableCell.classList = 'text-end';
    tableCell.innerHTML = `
    <button 
      class=" btn btn-sm btn-light" 
      type="button">
      <i class="far fa-trash-alt"></i>
    </button>`
    tableCell.addEventListener('click', deleteTableRow)
    return tableCell;
  } 


  // create category table row
  const createTableRow = () => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `<th scope="row"></th>
  <td>
    <input type="text" placeholder="Name" data-input="name"
      class="form-control" required>
  </td>
  <td>
    <input type="text" placeholder="yyyy-mm-dd" data-input="start_date"
      class="form-control" required>
  </td>
  <td>
    <input type="text" class="form-control" data-input="start_time"
      placeholder="18:00" required>
  </td>
  <td>
    <input type="text" class="form-control" data-input="end_date"
      placeholder="yyyy-mm-dd" required>
  </td>
  <td>
    <input type="text" class="form-control" data-input="end_time"
      placeholder="23:00" required>
  </td>
  <td class="text-end"></td>`
    const buttonCell = createDeleteBtnCell();
    tableRow.appendChild(buttonCell);
    return tableRow;
  }


  //-------------------
  // combine
  const formEl = event.target.closest('form');
  const tableBody = formEl.querySelector('tbody')
  const newRow = createTableRow();
  tableBody.appendChild(newRow);
}

btnAddCategoryTableRow.addEventListener('click', addCategoryTableRow);