// navigation.js - Handles page transitions and navigation

document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
});

function initPageTransitions() {
    // Get all links that should trigger page transitions
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([data-no-transition]), a[href^="./"]:not([data-no-transition]), a[href^="../"]:not([data-no-transition]), a[href^="#"]:not([data-no-transition])');

    // Add click listeners to all internal links
    internalLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Listen for back/forward browser navigation
    window.addEventListener('popstate', handlePopState);

    // Initial page load
    showPage(window.location.pathname);
}

function handleLinkClick(event) {
    // Prevent default link behavior
    event.preventDefault();
    
    const targetHref = event.currentTarget.getAttribute('href');
    
    // Handle hash links within the same page
    if (targetHref.startsWith('#')) {
        const targetElement = document.querySelector(targetHref);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    // Navigate to the new page with transition
    navigateTo(targetHref);
}

function handlePopState() {
    // Handle browser back/forward navigation
    showPage(window.location.pathname);
}

function navigateTo(url) {
    // Start transition animation
    startPageTransition();
    
    // Update browser history
    window.history.pushState({}, '', url);
    
    // Load the new page content
    showPage(url);
}

function startPageTransition() {
    // Show loading animation
    const loader = document.querySelector('.page-loader');
    loader.classList.add('active');
    
    // Disable scrolling during transition
    document.body.classList.add('transition-active');
}

function endPageTransition() {
    // Hide loading animation
    const loader = document.querySelector('.page-loader');
    loader.classList.remove('active');
    
    // Re-enable scrolling
    document.body.classList.remove('transition-active');
}

async function showPage(url) {
    try {
        // Normalize URL
        if (url === '/' || url === '') {
            url = '/index.html';
        } else if (!url.endsWith('.html')) {
            url = `${url}.html`;
        }

        // Fetch the page content
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load page: ${response.status}`);
        
        const html = await response.text();
        
        // Extract the main content from the fetched page
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('main').innerHTML;
        
        // Update the page title
        document.title = doc.title;
        
        // Update the main content
        document.querySelector('main').innerHTML = newContent;
        
        // Highlight the current navigation item
        updateNavigation(url);
        
        // Initialize any scripts specific to the new page
        initPageScripts(url);
        
    } catch (error) {
        console.error('Error loading page:', error);
    } finally {
        // Always end the transition, even if there was an error
        setTimeout(endPageTransition, 500); // Small delay for animation smoothness
    }
}

function updateNavigation(url) {
    // Remove active class from all navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the current page link
    const currentPage = url.split('/').pop();
    document.querySelectorAll(`.nav-links a[href*="${currentPage}"]`).forEach(link => {
        link.classList.add('active');
    });
}

function initPageScripts(url) {
    // Initialize page-specific scripts based on the URL
    const pageName = url.split('/').pop().replace('.html', '');
    
    // Run global scripts for all pages
    initCommonElements();
    
    // Run page-specific initialization
    switch (pageName) {
        case 'index':
            // Home page specific scripts
            break;
        case 'portfolio':
            // Portfolio specific scripts, like filters or lightbox
            if (typeof initPortfolio === 'function') {
                initPortfolio();
            }
            break;
        case 'contact':
            // Form validation or submission logic
            if (typeof initContactForm === 'function') {
                initContactForm();
            }
            break;
    }
}

function initCommonElements() {
    // Initialize elements common to all pages
    // For example, tooltips, dropdowns, etc.
}