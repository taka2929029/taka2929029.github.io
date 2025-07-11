/**
 * Form validation and handling for ケアプランセンターとんとん contact form
 * Provides comprehensive client-side validation with accessibility support
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        return; // Exit if contact form is not present on this page
    }

    // ===========================================
    // Form Elements
    // ===========================================
    
    const formElements = {
        name: contactForm.querySelector('#name'),
        kana: contactForm.querySelector('#kana'),
        phone: contactForm.querySelector('#phone'),
        email: contactForm.querySelector('#email'),
        subject: contactForm.querySelector('#subject'),
        message: contactForm.querySelector('#message'),
        privacy: contactForm.querySelector('#privacy'),
        submitButton: contactForm.querySelector('.contact-form__submit-button')
    };

    // ===========================================
    // Validation Rules
    // ===========================================
    
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[ぁ-んァ-ヶ一-龠ー\s]+$/,
            message: {
                required: 'お名前を入力してください',
                minLength: 'お名前は2文字以上で入力してください',
                maxLength: 'お名前は50文字以内で入力してください',
                pattern: 'お名前は日本語で入力してください'
            }
        },
        kana: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[ァ-ヶー\s]+$/,
            message: {
                required: 'フリガナを入力してください',
                minLength: 'フリガナは2文字以上で入力してください',
                maxLength: 'フリガナは50文字以内で入力してください',
                pattern: 'フリガナはカタカナで入力してください'
            }
        },
        phone: {
            required: true,
            pattern: /^0\d{1,4}-\d{1,4}-\d{3,4}$|^0\d{9,10}$/,
            message: {
                required: '電話番号を入力してください',
                pattern: '電話番号の形式が正しくありません（例：06-6328-8855）'
            }
        },
        email: {
            required: false,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: {
                pattern: 'メールアドレスの形式が正しくありません'
            }
        },
        subject: {
            required: true,
            message: {
                required: 'お問い合わせ項目を選択してください'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: {
                required: 'お問い合わせ内容を入力してください',
                minLength: 'お問い合わせ内容は10文字以上で入力してください',
                maxLength: 'お問い合わせ内容は1000文字以内で入力してください'
            }
        },
        privacy: {
            required: true,
            message: {
                required: '個人情報保護方針への同意が必要です'
            }
        }
    };

    // ===========================================
    // Error Display Functions
    // ===========================================
    
    function showError(fieldName, message) {
        const field = formElements[fieldName];
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (field && errorElement) {
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = message;
            errorElement.classList.add('is-visible');
            errorElement.setAttribute('role', 'alert');
        }
    }
    
    function hideError(fieldName) {
        const field = formElements[fieldName];
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (field && errorElement) {
            field.classList.remove('is-invalid');
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            errorElement.classList.remove('is-visible');
            errorElement.removeAttribute('role');
        }
    }
    
    function clearAllErrors() {
        Object.keys(formElements).forEach(function(fieldName) {
            if (fieldName !== 'submitButton') {
                hideError(fieldName);
            }
        });
    }

    // ===========================================
    // Validation Functions
    // ===========================================
    
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return true;
        
        // Required field validation
        if (rules.required && (!value || value.trim() === '')) {
            showError(fieldName, rules.message.required);
            return false;
        }
        
        // Skip further validation if field is not required and empty
        if (!rules.required && (!value || value.trim() === '')) {
            hideError(fieldName);
            return true;
        }
        
        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            showError(fieldName, rules.message.minLength);
            return false;
        }
        
        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            showError(fieldName, rules.message.maxLength);
            return false;
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(fieldName, rules.message.pattern);
            return false;
        }
        
        // Checkbox validation (for privacy)
        if (fieldName === 'privacy') {
            const checkbox = formElements[fieldName];
            if (rules.required && !checkbox.checked) {
                showError(fieldName, rules.message.required);
                return false;
            }
        }
        
        hideError(fieldName);
        return true;
    }
    
    function validateForm() {
        let isValid = true;
        
        Object.keys(formElements).forEach(function(fieldName) {
            if (fieldName !== 'submitButton') {
                const field = formElements[fieldName];
                let value;
                
                if (fieldName === 'privacy') {
                    value = field.checked;
                } else {
                    value = field.value.trim();
                }
                
                if (!validateField(fieldName, value)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    // ===========================================
    // Real-time Validation
    // ===========================================
    
    Object.keys(formElements).forEach(function(fieldName) {
        if (fieldName !== 'submitButton') {
            const field = formElements[fieldName];
            
            // Validate on blur
            field.addEventListener('blur', function() {
                let value;
                if (fieldName === 'privacy') {
                    value = this.checked;
                } else {
                    value = this.value.trim();
                }
                validateField(fieldName, value);
            });
            
            // Clear error on input (for better UX)
            field.addEventListener('input', function() {
                if (field.classList.contains('is-invalid')) {
                    hideError(fieldName);
                }
            });
            
            // Specific input formatting
            if (fieldName === 'phone') {
                field.addEventListener('input', function() {
                    // Auto-format phone number
                    let value = this.value.replace(/[^\d]/g, '');
                    if (value.length > 10) {
                        value = value.substring(0, 11);
                    }
                    
                    // Format as XXX-XXXX-XXXX or XX-XXXX-XXXX
                    if (value.length >= 10) {
                        if (value.length === 10) {
                            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                        } else {
                            value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
                        }
                    } else if (value.length >= 6) {
                        value = value.replace(/(\d{2,3})(\d{4})(\d+)/, '$1-$2-$3');
                    } else if (value.length >= 2) {
                        value = value.replace(/(\d{2,3})(\d+)/, '$1-$2');
                    }
                    
                    this.value = value;
                });
            }
            
            if (fieldName === 'kana') {
                field.addEventListener('input', function() {
                    // Convert hiragana to katakana automatically
                    this.value = this.value.replace(/[ぁ-ん]/g, function(match) {
                        return String.fromCharCode(match.charCodeAt(0) + 0x60);
                    });
                });
            }
        }
    });

    // ===========================================
    // Form Submission
    // ===========================================
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Clear any previous errors
        clearAllErrors();
        
        // Validate form
        if (!validateForm()) {
            // Focus first invalid field
            const firstInvalidField = contactForm.querySelector('.is-invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        const originalButtonText = formElements.submitButton.textContent;
        formElements.submitButton.textContent = '送信中...';
        formElements.submitButton.disabled = true;
        formElements.submitButton.insertAdjacentHTML('beforeend', ' <span class="loading"></span>');
        
        try {
            // Collect form data
            const formData = new FormData(contactForm);
            
            // In a real application, you would send this data to your server
            // For demonstration purposes, we'll simulate a form submission
            await simulateFormSubmission(formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            clearAllErrors();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('送信に失敗しました。お電話でお問い合わせいただくか、しばらく時間をおいて再度お試しください。');
        } finally {
            // Restore button state
            formElements.submitButton.textContent = originalButtonText;
            formElements.submitButton.disabled = false;
        }
    });

    // ===========================================
    // Form Submission Simulation
    // ===========================================
    
    async function simulateFormSubmission(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log form data (in real application, send to server)
        console.log('Form submission data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // Simulate random success/failure for demonstration
        if (Math.random() > 0.1) { // 90% success rate
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Server error'));
        }
    }

    // ===========================================
    // Success/Error Messages
    // ===========================================
    
    function showSuccessMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message form-message--success';
        messageDiv.setAttribute('role', 'alert');
        messageDiv.innerHTML = `
            <h3>お問い合わせありがとうございます</h3>
            <p>お問い合わせを受け付けいたしました。<br>
            1〜2営業日以内にご返信いたします。<br>
            お急ぎの場合は、お電話でお問い合わせください。</p>
        `;
        
        messageDiv.style.cssText = `
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Remove message after 10 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 10000);
    }
    
    function showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message form-message--error';
        messageDiv.setAttribute('role', 'alert');
        messageDiv.innerHTML = `
            <h3>送信エラー</h3>
            <p>${message}</p>
        `;
        
        messageDiv.style.cssText = `
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Remove message after 10 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 10000);
    }

    // ===========================================
    // Form Auto-save (Optional)
    // ===========================================
    
    function saveFormData() {
        if ('localStorage' in window) {
            const formData = {};
            Object.keys(formElements).forEach(function(fieldName) {
                if (fieldName !== 'submitButton' && fieldName !== 'privacy') {
                    const field = formElements[fieldName];
                    formData[fieldName] = field.value;
                }
            });
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        }
    }
    
    function loadFormData() {
        if ('localStorage' in window) {
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                try {
                    const formData = JSON.parse(savedData);
                    Object.keys(formData).forEach(function(fieldName) {
                        if (formElements[fieldName]) {
                            formElements[fieldName].value = formData[fieldName];
                        }
                    });
                } catch (error) {
                    console.error('Error loading saved form data:', error);
                }
            }
        }
    }
    
    function clearSavedFormData() {
        if ('localStorage' in window) {
            localStorage.removeItem('contactFormData');
        }
    }
    
    // Auto-save form data on input
    Object.keys(formElements).forEach(function(fieldName) {
        if (fieldName !== 'submitButton' && fieldName !== 'privacy') {
            const field = formElements[fieldName];
            field.addEventListener('input', debounce(saveFormData, 1000));
        }
    });
    
    // Load saved form data on page load
    loadFormData();
    
    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        setTimeout(clearSavedFormData, 3000); // Clear after success message
    });

    // ===========================================
    // Accessibility Enhancements
    // ===========================================
    
    // Add live region for dynamic messages
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Announce validation errors to screen readers
    function announceError(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
    
    // Enhanced keyboard navigation for custom elements
    document.addEventListener('keydown', function(event) {
        // Custom keyboard handling can be added here
        if (event.key === 'Tab') {
            // Ensure proper tab order
            const focusableElements = contactForm.querySelectorAll(
                'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey && document.activeElement === firstElement) {
                    // Focus last element when shift+tab on first element
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    // Focus first element when tab on last element
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // ===========================================
    // Form Analytics (Optional)
    // ===========================================
    
    // Track form interaction events
    function trackFormEvent(eventName, fieldName = null) {
        console.log('Form Event:', eventName, fieldName ? `Field: ${fieldName}` : '');
        // You can send analytics data to your tracking service here
    }
    
    // Track form start
    let formStarted = false;
    Object.keys(formElements).forEach(function(fieldName) {
        if (fieldName !== 'submitButton') {
            const field = formElements[fieldName];
            field.addEventListener('focus', function() {
                if (!formStarted) {
                    trackFormEvent('form_start');
                    formStarted = true;
                }
                trackFormEvent('field_focus', fieldName);
            });
        }
    });
    
    // Track form submission attempts
    contactForm.addEventListener('submit', function() {
        trackFormEvent('form_submit_attempt');
    });

    console.log('Contact form validation system initialized');
});

// ===========================================
// Utility Functions for Form Handling
// ===========================================

/**
 * Debounce function (if not already defined in main.js)
 */
if (typeof debounce === 'undefined') {
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}