# Kaif Survey and Consulting - Refactored Architecture

This is the officially refactored website for **Kaif Survey and Consulting**, a company specializing in providing professional survey and consulting services.

## Architecture Refactoring

The original monolithic HTML structure has been successfully modularized following modern frontend architecture principles. The goal of this refactor was to strictly separate concerns, improve code maintainability, and improve logical organization across multiple documents without relying on heavy frameworks.

### Changes Made

- **CSS Extraction:** All custom styles and root variables were extracted from inline `<style>` blocks into a unified `styles.css`.
- **JavaScript Extraction:** Application logic such as theme toggling, intersection observers (scroll animations), stat counters, and form handling were shifted into a unified `script.js`.
- **HTML Modularization:** The monolithic `index.html` file has been structurally divided into major domain sections (Services, Process, Testimonials, Pricing, Contact). Each HTML file maintains its semantic structure, header navigation, footers, and dynamically links to the extracted CSS and JS resources.

## Project Directory Structure

```text
.
├── README.md              # Project documentation and architectural overview
├── index.html             # Homepage featuring Hero Section and Quick Stats
├── services.html          # Detailed view of available surveying services
├── process.html           # Step-by-step workflow overview
├── testimonials.html      # Client feedback and reviews
├── pricing.html           # Transparent pricing tiers and packages
├── contact.html           # Contact information and interactive quote form
├── styles.css             # Unified CSS styles, themes, and animations
└── script.js              # Interactivity, form logic, and UI behavior
```

## Features

- **Responsive Design:** Fully responsive layout with fallback mechanisms adapting fluidly to varying screen sizes.
- **Dark Mode Configuration:** Automatic user-preference detection coupled with manual toggling logic.
- **Dynamic Elements:** High-performance intersection observers reveal components dynamically during scroll.
- **Accessible Validation:** Interactive form components include rigorous validation and A11y-compliant polite announcements for screen readers.

## Getting Started

To run the project locally without CORS restrictions for module/script loading, launch a simple HTTP server from the project root.

```bash
# Using Python 3
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` in your web browser.
