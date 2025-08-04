document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const dobInput = document.getElementById('dob');
    const courseInput = document.getElementById('course');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessageDiv = document.getElementById('successMessage');

    fullNameInput.addEventListener('blur', () => {
        fullNameInput.value = fullNameInput.value.toUpperCase();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            displayConfirmation();
        }
    });
    
    form.addEventListener('reset', () => {
        document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        successMessageDiv.style.display = 'none';
        successMessageDiv.textContent = '';
    });

    function validateForm() {
        let isValid = true;
        clearAllErrors();

        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, 'Full Name is required.');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email Address is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!mobileInput.value.trim()) {
            showError(mobileInput, 'Mobile Number is required.');
            isValid = false;
        } else if (!/^\d{10}$/.test(mobileInput.value)) {
            showError(mobileInput, 'Mobile Number must be 10 digits.');
            isValid = false;
        }

        if (!dobInput.value) {
            showError(dobInput, 'Date of Birth is required.');
            isValid = false;
        }

        const genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            showError(document.querySelector('.radio-group'), 'Gender is required.');
            isValid = false;
        }

        if (!courseInput.value) {
            showError(courseInput, 'Please select a course.');
            isValid = false;
        }
        
        const skillsSelected = document.querySelectorAll('input[name="skills"]:checked');
        if (skillsSelected.length === 0) {
            showError(document.querySelector('.checkbox-group'), 'Please select at least one skill.');
            isValid = false;
        }

        const passwordValue = passwordInput.value;
        if (!passwordValue) {
            showError(passwordInput, 'Password is required.');
            isValid = false;
        } else if (!isStrongPassword(passwordValue)) {
            showError(passwordInput, 'Password is not strong enough.');
            isValid = false;
        }

        if (!confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Please confirm your password.');
            isValid = false;
        } else if (passwordValue !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        return isValid;
    }

    function showError(inputElement, message) {
        const errorContainer = inputElement.classList.contains('radio-group') || inputElement.classList.contains('checkbox-group')
            ? inputElement.nextElementSibling
            : inputElement.parentElement.querySelector('.error-message');
            
        const field = inputElement.classList.contains('radio-group') || inputElement.classList.contains('checkbox-group')
            ? inputElement
            : inputElement;

        if (errorContainer) {
            errorContainer.textContent = message;
        }
        if(field.tagName === 'INPUT' || field.tagName === 'SELECT') {
            field.classList.add('input-error');
        }
    }
    
    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isStrongPassword(password) {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
        return re.test(password);
    }
    
    function displayConfirmation() {
        const skillsChecked = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(el => el.value);
        
        const data = `Please confirm your details:\n
        Full Name: ${fullNameInput.value}
        Email: ${emailInput.value}
        Mobile: ${mobileInput.value}
        Date of Birth: ${dobInput.value}
        Gender: ${document.querySelector('input[name="gender"]:checked').value}
        Course: ${courseInput.value}
        Skills: ${skillsChecked.join(', ')}
        `;
        
        if (confirm(data)) {
            successMessageDiv.textContent = '✅ Registration Successful!';
            successMessageDiv.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
            }, 3000);
        }
    }
    const focusableElements = Array.from(form.querySelectorAll('input, select'));
    
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const currentElement = document.activeElement;
            const currentIndex = focusableElements.indexOf(currentElement);

            if (currentIndex > -1) {
                e.preventDefault();

                const nextElement = focusableElements[currentIndex + 1];

                if (nextElement) {
                    nextElement.focus();
                } else {
                    form.querySelector('.submit-btn').click();
                }
            }
        }
    });
});
