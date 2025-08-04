document.addEventListener('DOMContentLoaded', () => {
  const backendUrl = 'https://script.google.com/macros/s/AKfycbxrTF5J4smgfaFYvsyNlFRF3bQ7JUsRwnYWba-JYMAbKFUabyJBRQIjVWdZo1MorQRqnA/exec';
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');

  const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Hide messages initially
    successMsg.classList.add('d-none');
    errorMsg.classList.add('d-none');


    // Inside the submit handler:
    spinner.classList.remove('d-none'); // Show spinner
    submitBtn.disabled = true;
    submitBtn.lastChild.textContent = 'Submitting...'; // Change button text

    // Collect form data
    const formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    try {
        const formData = new URLSearchParams();
        formData.append('Action', 'email');
        formData.append('Type', 'contact');
        formData.append('Data', JSON.stringify(data));
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              },
          body: formData.toString(),
        });

      console.log('Response:', JSON.stringify(data));

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const result = await response.json();

      // Show success message and reset form
      successMsg.classList.remove('d-none');
      form.reset();

      console.log('Success:', result);
    } catch (error) {
      // Show error message
      errorMsg.classList.remove('d-none');
      console.error('Error:', error);
    }
    finally {
      spinner.classList.add('d-none'); // Hide spinner
      submitBtn.disabled = false;
      submitBtn.lastChild.textContent = 'Send Message'; // Reset button text
    }
  });
});
