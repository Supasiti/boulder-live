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
    <input type="text" placeholder="Name"
      class="form-control category-name-input">
  </td>
  <td>
    <input type="text" placeholder="yyyy-mm-dd" 
      class="form-control category-start-date-input" >
  </td>
  <td>
    <input type="text" class="form-control" placeholder="18:00" >
  </td>
  <td>
    <input type="text" class="form-control" placeholder="yyyy-mm-dd" >
  </td>
  <td>
    <input type="text" class="form-control" placeholder="23:00" >
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