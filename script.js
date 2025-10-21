const defaultConfig = {
    company_name: "Kaif Survey & Consulting",
    tagline: "Professional Survey & Consulting Services",
    hero_title: "Expert Survey & Consulting Solutions",
    hero_subtitle: "Delivering accurate land surveys, property assessments, and professional consulting services with precision and reliability across Bangladesh.",
    office_address: "Plot-229, Zaman Tower, Azampur Road, Uttarkhan, Uttara, Dhaka-1230",
    phone_number: "+880 1712-345678",
    email_address: "alamgirwss@gmail.com"
};

async function render(config) {
    document.getElementById('company-name').textContent = config.company_name || defaultConfig.company_name;
    document.getElementById('tagline').textContent = config.tagline || defaultConfig.tagline;
    document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
    document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    document.getElementById('office-address').textContent = config.office_address || defaultConfig.office_address;
    document.getElementById('phone-number').textContent = config.phone_number || defaultConfig.phone_number;
    document.getElementById('email-address').textContent = config.email_address || defaultConfig.email_address;
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["company_name", config.company_name || defaultConfig.company_name],
        ["tagline", config.tagline || defaultConfig.tagline],
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
        ["office_address", config.office_address || defaultConfig.office_address],
        ["phone_number", config.phone_number || defaultConfig.phone_number],
        ["email_address", config.email_address || defaultConfig.email_address]
    ]);
}

// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });
});

// Form submission handler
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Show success message
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    button.classList.add('bg-green-600');

    // Reset form and button after 3 seconds
    setTimeout(() => {
        this.reset();
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }, 3000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar transparency on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const companyName = document.getElementById('company-name');
    const tagline = document.getElementById('tagline');
    if (window.scrollY > 50) {
        header.classList.add('bg-transparent', 'shadow-none');
        header.classList.remove('bg-white', 'shadow-lg');
        navLinks.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-gray-700');
        });
        companyName.classList.add('text-white');
        companyName.classList.remove('text-gray-900');
        tagline.classList.add('text-white');
        tagline.classList.remove('text-gray-600');
    } else {
        header.classList.add('bg-white', 'shadow-lg');
        header.classList.remove('bg-transparent', 'shadow-none');
        navLinks.forEach(link => {
            link.classList.add('text-gray-700');
            link.classList.remove('text-white');
        });
        companyName.classList.add('text-gray-900');
        companyName.classList.remove('text-white');
        tagline.classList.add('text-gray-600');
        tagline.classList.remove('text-white');
    }
});

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        render,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// Theme toggle functionality
const themeToggleButton = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const body = document.body;

// Function to apply theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        body.classList.remove('dark-mode');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
};

// Check for saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Theme toggle button event listener
themeToggleButton.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});
