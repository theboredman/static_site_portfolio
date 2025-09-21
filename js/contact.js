/**
 * Contact Form Functionality
 * Handles form validation and provides static contact options
 */

(function () {
    'use strict';

    // ==========================================================================
    // Form Elements
    // ==========================================================================

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formResult = document.getElementById('form-result');

    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // ==========================================================================
    // Form Validation
    // ==========================================================================

    const validators = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (minimum 2 characters, letters only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'Subject must be between 5 and 100 characters'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be between 10 and 1000 characters'
        }
    };

    function validateField(fieldName, value) {
        const rules = validators[fieldName];
        if (!rules) return { isValid: true };

        // Required check
        if (rules.required && !value.trim()) {
            return { isValid: false, message: `${fieldName} is required` };
        }

        // Length checks
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: rules.message };
        }

        // Pattern check
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }

        return { isValid: true };
    }

    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        if (fieldElement) {
            fieldElement.classList.add('error');
        }
    }

    function clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);

        if (errorElement) {
            errorElement.style.display = 'none';
        }

        if (fieldElement) {
            fieldElement.classList.remove('error');
        }
    }

    function validateForm() {
        const formData = {
            name: nameField?.value || '',
            email: emailField?.value || '',
            subject: subjectField?.value || '',
            message: messageField?.value || ''
        };

        let isValid = true;
        const errors = {};

        // Validate each field
        Object.keys(formData).forEach(fieldName => {
            const validation = validateField(fieldName, formData[fieldName]);

            if (!validation.isValid) {
                errors[fieldName] = validation.message;
                showFieldError(fieldName, validation.message);
                isValid = false;
            } else {
                clearFieldError(fieldName);
            }
        });

        return { isValid, errors, data: formData };
    }

    // ==========================================================================
    // Real-time Validation
    // ==========================================================================

    function initRealTimeValidation() {
        const fields = [nameField, emailField, subjectField, messageField];

        fields.forEach(field => {
            if (!field) return;

            field.addEventListener('blur', () => {
                const fieldName = field.name;
                const value = field.value;
                const validation = validateField(fieldName, value);

                if (!validation.isValid) {
                    showFieldError(fieldName, validation.message);
                } else {
                    clearFieldError(fieldName);
                }
            });

            field.addEventListener('input', () => {
                // Clear error on input if field was previously invalid
                if (field.classList.contains('error')) {
                    const fieldName = field.name;
                    const value = field.value;
                    const validation = validateField(fieldName, value);

                    if (validation.isValid) {
                        clearFieldError(fieldName);
                    }
                }

                // Update character count for message field
                if (field.name === 'message') {
                    updateCharacterCount(field);
                }
            });
        });
    }

    function updateCharacterCount(textarea) {
        const maxLength = 1000;
        const currentLength = textarea.value.length;

        let countElement = document.getElementById('message-count');
        if (!countElement) {
            countElement = document.createElement('div');
            countElement.id = 'message-count';
            countElement.className = 'character-count';
            textarea.parentElement.appendChild(countElement);
        }

        countElement.textContent = `${currentLength}/${maxLength}`;

        if (currentLength > maxLength * 0.9) {
            countElement.classList.add('warning');
        } else {
            countElement.classList.remove('warning');
        }
    }

    // ==========================================================================
    // Form Submission
    // ==========================================================================

    function initFormSubmission() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate form
            const validation = validateForm();
            if (!validation.isValid) {
                showFormMessage('Please correct the errors above.', 'error');
                return;
            }

            // Show loading state
            setSubmitButtonState('loading');
            clearFormMessage();

            try {
                // For static site, create mailto link with form data
                const { name, email, subject, message } = validation.data;
                const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                const mailtoLink = `mailto:imgalibb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

                // Open default email client
                window.location.href = mailtoLink;

                // Show success message
                showFormMessage('Opening your email client... If it doesn\'t open automatically, please email me directly at imgalibb@gmail.com', 'success');

                // Track form submission (analytics)
                trackFormSubmission('success');

                // Reset form after a delay
                setTimeout(() => {
                    resetForm();
                }, 3000);

            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('Please email me directly at imgalibb@gmail.com or use the contact methods below.', 'error');
                trackFormSubmission('error');
            } finally {
                setTimeout(() => {
                    setSubmitButtonState('default');
                }, 1000);
            }
        });
    }

    function setSubmitButtonState(state) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        switch (state) {
            case 'loading':
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                btnLoading.style.display = 'flex';
                btnIcon.style.display = 'none';
                submitBtn.classList.add('loading');
                break;
            case 'success':
                submitBtn.disabled = false;
                btnText.textContent = 'Message Sent!';
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                btnIcon.style.display = 'block';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');

                setTimeout(() => {
                    resetSubmitButton();
                }, 3000);
                break;
            default:
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                btnIcon.style.display = 'block';
                submitBtn.classList.remove('loading', 'success');
        }
    }

    function resetSubmitButton() {
        setSubmitButtonState('default');
    }

    function showFormMessage(message, type) {
        if (!formResult) return;

        formResult.textContent = message;
        formResult.className = `form-result ${type}`;
        formResult.style.display = 'block';
        formResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function clearFormMessage() {
        if (formResult) {
            formResult.style.display = 'none';
        }
    }

    function resetForm() {
        contactForm.reset();

        // Clear all errors
        Object.keys(validators).forEach(fieldName => {
            clearFieldError(fieldName);
        });

        // Remove focused states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });

        // Remove character count
        const charCount = document.getElementById('message-count');
        if (charCount) charCount.remove();
    }

    // ==========================================================================
    // Analytics Tracking
    // ==========================================================================

    function trackFormSubmission(status) {
        // Analytics tracking would go here
        console.log(`Contact form submission: ${status}`);

        // Example: Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: status,
                value: status === 'success' ? 1 : 0
            });
        }
    }

    // ==========================================================================
    // Accessibility Enhancements
    // ==========================================================================

    function initAccessibilityFeatures() {
        // Add ARIA live region for form feedback
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'form-live-region';
        document.body.appendChild(liveRegion);

        // Announce form status changes
        const originalShowFormMessage = showFormMessage;
        window.showFormMessage = function (message, type) {
            originalShowFormMessage(message, type);
            liveRegion.textContent = message;
        };
    }

    // ==========================================================================
    // Auto-save Draft (Local Storage)
    // ==========================================================================

    function initAutoSave() {
        const fields = [nameField, emailField, subjectField, messageField];
        const saveKey = 'contact-form-draft';

        // Load saved data
        const savedData = localStorage.getItem(saveKey);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = document.getElementById(key);
                    if (field && data[key]) {
                        field.value = data[key];
                        field.parentElement.classList.add('focused');
                    }
                });
            } catch (e) {
                console.warn('Could not load saved form data');
            }
        }

        // Save data on input
        fields.forEach(field => {
            if (!field) return;

            field.addEventListener('input', debounce(() => {
                const formData = {
                    name: nameField?.value || '',
                    email: emailField?.value || '',
                    subject: subjectField?.value || '',
                    message: messageField?.value || ''
                };

                localStorage.setItem(saveKey, JSON.stringify(formData));
            }, 500));
        });

        // Clear saved data on successful submission
        const originalResetForm = resetForm;
        resetForm = function () {
            originalResetForm();
            localStorage.removeItem(saveKey);
        };
    }

    // ==========================================================================
    // Utility Functions
    // ==========================================================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================================================
    // Initialize
    // ==========================================================================

    function init() {
        initRealTimeValidation();
        initFormSubmission();
        initAccessibilityFeatures();
        initAutoSave();

        console.log('📝 Contact form initialized');
        console.log('✅ Form validation active');
        console.log('💾 Auto-save enabled');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();