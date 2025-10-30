document.addEventListener('DOMContentLoaded', () => {

    // === 1. THEME TOGGLING ===
    const themeToggleBtns = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile')
    ];
    const lightIcons = [
        document.getElementById('theme-icon-light'),
        document.getElementById('theme-icon-light-mobile')
    ];
    const darkIcons = [
        document.getElementById('theme-icon-dark'),
        document.getElementById('theme-icon-dark-mobile')
    ];
    const statusMessage = document.getElementById('status-message');

    let currentTheme = localStorage.getItem('theme');

    // Check system preference if no theme is stored
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
            lightIcons.forEach(icon => icon.classList.remove('hidden'));
            darkIcons.forEach(icon => icon.classList.add('hidden'));
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
            lightIcons.forEach(icon => icon.classList.add('hidden'));
            darkIcons.forEach(icon => icon.classList.remove('hidden'));
        }
        localStorage.setItem('theme', theme);
    }

    // Apply theme on initial load
    applyTheme(currentTheme);

    // Add click listener to all toggle buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            statusMessage.textContent = `Theme changed to ${newTheme} mode.`;
        });
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // === 2. STICKY HEADER ===
    const header = document.getElementById('header');
    const scrollThreshold = 50; // Pixels to scroll before header becomes sticky

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // === 3. MOBILE MENU ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
        });
    });

    // === 4. SMOOTH SCROLLING (for all hash links) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // === 5. FADE-IN ANIMATIONS ON SCROLL ===
    const sectionsToFade = document.querySelectorAll('.fade-in-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.15 });

    sectionsToFade.forEach(section => {
        sectionObserver.observe(section);
    });

    // === 6. ANIMATED STATISTICS COUNTERS ===
    const statsSection = document.getElementById('stats');
    let statsAnimated = false;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1500; // 1.5 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            el.textContent = current;
            if (current == target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                document.querySelectorAll('.stat-counter').forEach(animateCounter);
                statsAnimated = true; // Ensure it only runs once
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // === 7. CONTACT FORM VALIDATION & SUBMISSION ===
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Input fields and error messages
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        description: document.getElementById('description')
    };

    function showError(fieldId, message) {
        const field = inputs[fieldId];
        const errorEl = document.getElementById(`error-${fieldId}`);
        if (field && errorEl) {
            field.classList.add('invalid');
            field.setAttribute('aria-invalid', 'true');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    function hideError(fieldId) {
        const field = inputs[fieldId];
        const errorEl = document.getElementById(`error-${fieldId}`);
        if (field && errorEl) {
            field.classList.remove('invalid');
            field.setAttribute('aria-invalid', 'false');
            errorEl.style.display = 'none';
        }
    }

    function validateForm() {
        let isValid = true;

        // Reset errors
        Object.keys(inputs).forEach(hideError);

        // Validate Name
        if (inputs.name.value.trim() === '') {
            showError('name', 'Please enter your name.');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputs.email.value.trim() === '') {
            showError('email', 'Please enter your email address.');
            isValid = false;
        } else if (!emailRegex.test(inputs.email.value.trim())) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Description
        if (inputs.description.value.trim() === '') {
            showError('description', 'Please describe your project.');
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Start loading state
            submitText.classList.add('hidden');
            submitSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            statusMessage.textContent = 'Submitting your request...';

            // Simulate API call (1 second delay)
            setTimeout(() => {
                // Stop loading state
                submitText.classList.remove('hidden');
                submitSpinner.classList.add('hidden');
                submitBtn.disabled = false;

                // Show success modal
                successModal.classList.remove('opacity-0', 'pointer-events-none');
                successModal.classList.add('open');
                closeModalBtn.focus();
                statusMessage.textContent = 'Submission successful. Modal opened.';

                // Reset form
                form.reset();
            }, 1000);
        } else {
            statusMessage.textContent = 'Form validation failed. Please check the errors.';
            // Focus the first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });

    // Close modal
    function closeModal() {
        successModal.classList.add('opacity-0', 'pointer-events-none');
        successModal.classList.remove('open');
        statusMessage.textContent = 'Modal closed.';
    }
    closeModalBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('open')) {
            closeModal();
        }
    });

    // === 8. SET CURRENT YEAR IN FOOTER ===
    document.getElementById('current-year').textContent = new Date().getFullYear();

});
