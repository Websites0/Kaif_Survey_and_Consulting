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
document.querySelector('form').addEventListener('submit', function(e) {
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

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        render,
        mapToCapabilities,
        mapToEditPanelValues
    });
}
