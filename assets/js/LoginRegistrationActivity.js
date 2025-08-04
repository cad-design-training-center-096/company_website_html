import config from '../js/Config';

const container = document.getElementById('container');

function toggle() {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
}

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

const signInForm = container.querySelector('.sign-in .form');
const signUpForm = container.querySelector('.sign-up .form');

signInForm.querySelector('button').addEventListener('click', async (e) => {
  e.preventDefault();
  await signIn();
});

signUpForm.querySelector('button').addEventListener('click', async (e) => {
  e.preventDefault();
  await signUp();
});

async function signIn() {
  const email = signInForm.querySelector('input[placeholder="Username"]').value.trim();
  const password = signInForm.querySelector('input[placeholder="Password"]').value.trim();

  const signInBtn = signInForm.querySelector('button');
  const spinner = signInBtn.querySelector('.spinner-border');

  if (!email || !password) {
    alert('Please enter both username and password.');
    return;
  }

  spinner.style.display = 'inline-block';
  signInBtn.disabled = true;

  const formData = new URLSearchParams();
  formData.append('Action', 'login');
  formData.append('Type', 'college');
  formData.append('Email', email);
  formData.append('Password', password);

  try {
    const response = await fetch(config.endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const result = await response.json();

    if (!result.success) {
      alert(`Login failed: ${result.message || 'Unknown error'}`);
      return;
    }

    alert('Login successful!');
  } catch (err) {
    alert('Network error during login.');
    console.error(err);
  } finally {
    spinner.style.display = 'none';
    signInBtn.disabled = false;
  }
}

async function signUp() {
  const username = signUpForm.querySelector('input[placeholder="Username"]').value.trim();
  const email = signUpForm.querySelector('input[placeholder="Email"]').value.trim();
  const password = signUpForm.querySelector('input[placeholder="Password"]').value.trim();
  const confirmPassword = signUpForm.querySelector('input[placeholder="Confirm password"]').value.trim();

  const signUpBtn = signUpForm.querySelector('button');
  const spinner = signUpBtn.querySelector('.spinner-border');

  if (!username || !email || !password || !confirmPassword) {
    alert('Please fill all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  spinner.style.display = 'inline-block';
  signUpBtn.disabled = true;

  const formData = new URLSearchParams();
  formData.append('Action', 'registration');
  formData.append('Email', email);
  formData.append('Password', password);

  try {
    const response = await fetch(config.endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const result = await response.json();

    if (!result.success) {
      alert(`Registration failed: ${result.message || 'Unknown error'}`);
      return;
    }

    alert('Registration successful! You can now log in.');
    toggle();
  } catch (err) {
    alert('Network error during registration.');
    console.error(err);
  } finally {
    spinner.style.display = 'none';
    signUpBtn.disabled = false;
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
