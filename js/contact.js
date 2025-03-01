// contact.js - Script for handling contact form submission and FAQ toggles

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFaqToggles();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            try {
                // Simulate form submission with a timeout
                // In a real application, you'd send this data to a server
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.className = 'form-status success';
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                formStatus.textContent = 'There was a problem sending your message. Please try again.';
                formStatus.className = 'form-status error';
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide status message after a delay
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    // Reset after hiding
                    setTimeout(() => {
                        formStatus.style.display = '';
                        formStatus.className = 'form-status';
                    }, 300);
                }, 5000);
            }
        });
    }
}

// FAQ Accordion Toggles
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Close other FAQ items (uncomment for accordion behavior)
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */
        });
    });
}

// Make functions available globally
window.initContactForm = initContactForm;
window.initFaqToggles = initFaqToggles;