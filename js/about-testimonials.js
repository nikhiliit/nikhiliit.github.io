// about-testimonials.js - Script for testimonials slider on the about page

document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsSlider();
});

function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!testimonials.length) return;
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    
    // Initialize - show first testimonial
    showTestimonial(0);
    
    // Previous button click event
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        });
    }
    
    // Next button click event
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        });
    }
    
    // Dot click events
    if (dots) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
    }
    
    // Auto-advance carousel
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Pause auto-advance on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        slider.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                showTestimonial(currentIndex);
            }, 5000);
        });
    }
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = 0;
        });
        
        // Update dots
        if (dots) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
        
        // Show selected testimonial with fade-in effect
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = 1;
        }, 300);
    }
}

// Make function available globally
window.initTestimonialsSlider = initTestimonialsSlider;