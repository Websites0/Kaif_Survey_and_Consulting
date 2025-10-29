document.addEventListener('DOMContentLoaded', () => {
    // Copyright Year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme Toggling
    const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const html = document.documentElement;

    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        html.classList.toggle('dark', isDark);
        themeIcons.forEach(icon => icon.textContent = isDark ? 'dark_mode' : 'light_mode');
        localStorage.setItem('theme', theme);
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    themeToggles.forEach(toggle => toggle.addEventListener('click', toggleTheme));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light'); // Default theme
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
