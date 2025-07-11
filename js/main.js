/**
 * Main JavaScript file for ケアプランセンターとんとん
 * Handles navigation, accessibility, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===========================================
    // Navigation Menu Toggle
    // ===========================================
    
    const navToggle = document.querySelector('.header__nav-toggle');
    const navList = document.querySelector('.header__nav-list');
    
    // Create overlay element for mobile navigation
    const navOverlay = document.createElement('div');
    navOverlay.className = 'header__nav-overlay';
    document.body.appendChild(navOverlay);
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded attribute
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle navigation menu and overlay
            navList.classList.toggle('is-open');
            navOverlay.classList.toggle('is-open');
            
            // Update aria-label
            const label = !isExpanded ? 'メニューを閉じる' : 'メニューを開く';
            navToggle.setAttribute('aria-label', label);
            
            // Prevent body scroll when menu is open on mobile
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close navigation when clicking on overlay
        navOverlay.addEventListener('click', function() {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('is-open');
            navOverlay.classList.remove('is-open');
            navToggle.setAttribute('aria-label', 'メニューを開く');
            document.body.style.overflow = '';
        });
        
        // Close navigation when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navList.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('is-open');
                navOverlay.classList.remove('is-open');
                navToggle.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            }
        });
        
        // Close navigation when pressing escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navList.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('is-open');
                navOverlay.classList.remove('is-open');
                navToggle.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 991 && navList.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('is-open');
                navOverlay.classList.remove('is-open');
                navToggle.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            }
        });
    }

    // ===========================================
    // Smooth Scrolling for Anchor Links
    // ===========================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a hash without target
            if (targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Focus the target element for accessibility
                targetElement.focus();
                
                // Close mobile menu if open
                if (navList && navList.classList.contains('is-open')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('is-open');
                    navOverlay.classList.remove('is-open');
                    navToggle.setAttribute('aria-label', 'メニューを開く');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ===========================================
    // FAQ Accordion Functionality
    // ===========================================
    
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other FAQ items
            faqQuestions.forEach(function(otherQuestion) {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0 var(--spacing-xl)';
                    }
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (answer) {
                if (!isExpanded) {
                    // Open
                    answer.style.maxHeight = '2000px';
                    answer.style.padding = 'var(--spacing-xl)';
                } else {
                    // Close
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 var(--spacing-xl)';
                }
            }
        });
        
        // Handle keyboard navigation
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    // ===========================================
    // Loading Animation
    // ===========================================
    
    function showLoading(element) {
        const originalText = element.textContent;
        element.textContent = '';
        element.insertAdjacentHTML('beforeend', '<span class="loading"></span> 送信中...');
        element.disabled = true;
        return originalText;
    }
    
    function hideLoading(element, originalText) {
        element.textContent = originalText;
        element.disabled = false;
    }

    // ===========================================
    // Scroll to Top Functionality
    // ===========================================
    
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.setAttribute('aria-label', 'ページトップへ戻る');
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===========================================
    // Image Lazy Loading (for better performance)
    // ===========================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ===========================================
    // Focus Management for Accessibility
    // ===========================================
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'メインコンテンツへスキップ';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main element if it doesn't exist
    const mainElement = document.querySelector('main, .main');
    if (mainElement && !mainElement.id) {
        mainElement.id = 'main';
        mainElement.setAttribute('tabindex', '-1');
    }

    // ===========================================
    // Enhanced Keyboard Navigation
    // ===========================================
    
    // Trap focus in mobile navigation when open
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trapping to navigation when open
    if (navList) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (navList.classList.contains('is-open')) {
                        trapFocus(navList);
                        // Focus first navigation item
                        const firstNavLink = navList.querySelector('a');
                        if (firstNavLink) {
                            firstNavLink.focus();
                        }
                    }
                }
            });
        });
        
        observer.observe(navList, { attributes: true });
    }

    // ===========================================
    // Error Handling and User Feedback
    // ===========================================
    
    // Global error handler for JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // You could send error reports to your logging service here
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        // You could send error reports to your logging service here
    });

    // ===========================================
    // Analytics and User Interaction Tracking
    // ===========================================
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Phone link clicked:', this.href);
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.hero__cta, .contact-info__phone-link');
    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('CTA button clicked:', this.textContent.trim());
        });
    });

    // ===========================================
    // Performance Monitoring
    // ===========================================
    
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
            
            // You could send performance data to your monitoring service here
        }
    });

    // ===========================================
    // Progressive Enhancement
    // ===========================================
    
    // Add JavaScript-enabled class to body
    document.body.classList.add('js-enabled');
    
    // Remove no-js class if present
    document.body.classList.remove('no-js');

    // ===========================================
    // Print Optimization
    // ===========================================
    
    window.addEventListener('beforeprint', function() {
        // Expand all FAQ items for printing
        faqQuestions.forEach(function(question) {
            question.setAttribute('aria-expanded', 'true');
            const answer = question.nextElementSibling;
            if (answer) {
                answer.style.maxHeight = '2000px';
                answer.style.padding = 'var(--spacing-xl)';
            }
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Collapse all FAQ items after printing
        faqQuestions.forEach(function(question) {
            question.setAttribute('aria-expanded', 'false');
            const answer = question.nextElementSibling;
            if (answer) {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 var(--spacing-xl)';
            }
        });
    });

    // ===========================================
    // Initialization Complete
    // ===========================================
    
    console.log('ケアプランセンターとんとん website initialized successfully');
});

// ===========================================
// Utility Functions (Available globally)
// ===========================================

/**
 * Debounce function to limit function calls
 */
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

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}