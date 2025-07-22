document.addEventListener('DOMContentLoaded', () => {
  const backendUrl = 'https://script.google.com/macros/s/AKfycbx_ZH2HdQ-uSCw0IJu-me5mWsmsNg6u0FT1jvnoedA3K7_AkGMVsyJNr-t8HbI2Q7bo/exec';
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Hide messages initially
    successMsg.classList.add('d-none');
    errorMsg.classList.add('d-none');

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      });

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
  });
});
