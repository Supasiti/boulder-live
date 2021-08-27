const loginForm = document.querySelector('#login-form');

// login handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log in');
  }
};

addFormValidation(loginForm);
loginForm.addEventListener('submit', loginFormHandler);
