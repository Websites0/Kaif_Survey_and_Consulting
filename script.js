/* ==========================================================================
       JAVASCRIPT LOGIC
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Dynamic Year
      document.getElementById('year').textContent = new Date().getFullYear();

      // 2. Theme Toggle Logic
      const themeToggle = document.getElementById('theme-toggle');
      const htmlElement = document.documentElement;

      // Auto-detect preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
      } else if (prefersDark.matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
      }

      themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });

      function updateThemeIcon(theme) {
        if (theme === 'dark') {
          themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
          themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
      }

      // 3. Mobile Menu Toggle
      const menuToggle = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');

      menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // 4. Intersection Observer for Scroll Animations
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Check if it's a number counter
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            if(statNumbers.length > 0) {
              statNumbers.forEach(startCounter);
            } else if (entry.target.classList.contains('stat-number')) {
              startCounter(entry.target);
            }

            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });

      // 5. Animated Statistic Counters
      function startCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(prefersReducedMotion) {
          el.innerText = target + (target > 100 ? '+' : '');
          return;
        }

        const timer = setInterval(() => {
          current += 1;
          el.innerText = current + (target > 100 ? '+' : '');
          if (current >= target) {
            clearInterval(timer);
          }
        }, stepTime);
      }

      // 6. Form Validation & Submission
      const form = document.getElementById('contactForm');
      const announcer = document.getElementById('a11y-announcer');
      const modal = document.getElementById('successModal');
      const closeModalBtn = document.getElementById('closeModal');

      if (form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Validation Reset
        let isValid = true;
        form.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

        // Inputs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
          isValid = false;
          name.parentElement.classList.add('has-error');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          isValid = false;
          email.parentElement.classList.add('has-error');
        }

        if (!message.value.trim()) {
          isValid = false;
          message.parentElement.classList.add('has-error');
        }

        if (isValid) {
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.classList.add('loading');
          announcer.textContent = 'Submitting form, please wait...';

          // Simulate async submission
          setTimeout(() => {
            submitBtn.classList.remove('loading');
            form.reset();

            // Show Success Modal
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            announcer.textContent = 'Form submitted successfully.';
            closeModalBtn.focus(); // A11y focus management
          }, 1000);
        } else {
          announcer.textContent = 'Please correct the errors in the form before submitting.';
        }
      });

        // Close Modal Logic
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if(e.target === modal) closeModal();
        });

        function closeModal() {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          form.querySelector('input').focus(); // Return focus
        }
      }
    });
