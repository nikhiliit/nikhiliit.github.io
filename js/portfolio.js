// portfolio.js - Script for handling portfolio filters and project modals

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

function initPortfolio() {
    // Initialize portfolio filters
    setupFilters();
    
    // Initialize project detail modals
    setupProjectModals();
    
    // Initialize portfolio animations
    handlePortfolioAnimations();
}

// Portfolio Filtering
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 50);
                } else {
                    const categories = item.getAttribute('data-category').split(',');
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Set 'All' as default active filter
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
}

// Project Detail Modals
function setupProjectModals() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');
    const viewDetailBtns = document.querySelectorAll('.view-details');
    
    // Get all project details
    const projectDetails = document.querySelector('.project-details');
    if (!projectDetails) return;
    
    // Open modal when clicking "View Details" button
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the project ID
            const projectId = btn.getAttribute('data-project');
            
            // Get the corresponding project details
            const details = projectDetails.querySelector(`#${projectId}-details`);
            
            if (details) {
                // Clone the details to not modify the original
                const detailsClone = details.cloneNode(true);
                
                // Clear previous content and add new content
                modalBody.innerHTML = '';
                modalBody.appendChild(detailsClone);
                
                // Show modal
                modal.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Initialize thumbnail gallery if present
                initializeThumbnailGallery(modalBody);
            }
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// Thumbnail Gallery in Project Modal
function initializeThumbnailGallery(container) {
    const thumbnails = container.querySelectorAll('.project-thumbnail-grid img');
    const mainImage = container.querySelector('.project-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Swap main image source with thumbnail source
                const mainSrc = mainImage.src;
                mainImage.src = thumb.src;
                
                // Add "active" class to selected thumbnail and remove from others
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Add fade animation
                mainImage.classList.add('fade');
                setTimeout(() => {
                    mainImage.classList.remove('fade');
                }, 300);
            });
        });
    }
}

// Handle portfolio item animations
function handlePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Animate each portfolio item when it comes into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        portfolioItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        portfolioItems.forEach(item => {
            item.classList.add('animate');
        });
    }
}

// Make functions available globally
window.initPortfolio = initPortfolio;