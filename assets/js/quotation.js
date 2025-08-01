
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Hide any previous messages
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');

        // Disable the button to prevent multiple clicks
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';

        const quotationDetails = {
            organizationName: document.getElementById('collegeName').value.trim(),
            contactPerson: document.getElementById('personName').value.trim(),
            email: document.getElementById('personEmail').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            softwareRequired: Array.from(document.querySelectorAll('input[name="software"]:checked')).map(el => el.value),
            participants: parseInt(document.getElementById('participants').value),
            trainingDate: document.getElementById('trainingDate').value,
            totalHours: parseInt(document.getElementById('totalHours').value),
            trainingType: document.querySelector('input[name="trainingType"]:checked').value,
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            acceptTerms: document.getElementById('acceptTerms').checked
        };

        if (!quotationDetails.acceptTerms) {
            alert('Please accept the terms and conditions.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Request';
            return;
        }

        const formData = new URLSearchParams();
        formData.append('Action', 'email');
        formData.append('Type', 'quotation');
        formData.append('Data', JSON.stringify(quotationDetails));

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbx_ZH2HdQ-uSCw0IJu-me5mWsmsNg6u0FT1jvnoedA3K7_AkGMVsyJNr-t8HbI2Q7bo/exec', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Quotation request submitted successfully!');
                successMsg.classList.remove('d-none');
                form.reset();
            } else {
                const errorData = await response.json();
                alert('Failed to submit request: ' + (errorData.message || response.statusText));
                errorMsg.classList.remove('d-none');
            }
        } catch (error) {
            alert('Error submitting form: ' + error.message);
            errorMsg.classList.remove('d-none');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Request';
        }
    });

