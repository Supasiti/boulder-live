// add validation to form
const addFormValidation = (form) => {
  const validateInputs = (event) => {
    if ( !form.checkValidity() ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    form.classList.add('was-validated')
  }
  form.addEventListener('submit', validateInputs)
}