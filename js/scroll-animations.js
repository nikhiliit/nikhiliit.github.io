// scroll-animations.js - Handles animations triggered by scrolling
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
  });
  
  function initScrollAnimations() {
    // Add the animation classes to elements
    prepareElements();
    
    // Observe elements and trigger animations
    observeElements();
  }
  
  function prepareElements() {
    // Add animation classes to certain elements
    const elementsToAnimate = [
      { selector: '.service-card', animation: 'slide-up' },
      { selector: '.about-image', animation: 'slide-in-left' },
      { selector: '.about-text', animation: 'slide-in-right' },
      { selector: '.hero-image', animation: 'slide-in-right' },
      { selector: '.hero-text', animation: 'fade-in' },
      { selector: '.section-title', animation: 'fade-in' },
      { selector: '.testimonial-card', animation: 'scale-in' },
      { selector: '.cta-content', animation: 'scale-in' },
      { selector: '.interest-item', animation: 'bounce-in' },
      { selector: '.certification-item', animation: 'slide-in-left' },
      { selector: '.filter-buttons', animation: 'fade-in' },
      { selector: '.contact-info', animation: 'slide-in-left' },
      { selector: '.contact-form', animation: 'slide-in-right' },
      { selector: '.map-container', animation: 'fade-in' },
      { selector: '.faq-item', animation: 'slide-up' },
      { selector: '.projects-grid', animation: 'fade-in' },
      { selector: '.view-all-container', animation: 'fade-in' },
      { selector: '.page-hero-content', animation: 'fade-in' },
      { selector: '.services-intro', animation: 'fade-in' },
      { selector: '.process-step', animation: 'slide-up' },
      { selector: '.languages-grid', animation: 'fade-in' },
      { selector: '.resume-download-content', animation: 'scale-in' }
    ];
    
    elementsToAnimate.forEach(item => {
      const elements = document.querySelectorAll(item.selector);
      elements.forEach(element => {
        // Only add the class for elements that don't already have animation classes
        if (!hasAnimationClass(element)) {
          element.classList.add('animate-on-scroll');
          element.dataset.animation = item.animation;
          // Initially hide element
          element.style.opacity = "0";
        }
      });
    });
  }
  
  function hasAnimationClass(element) {
    const animationClasses = [
      'fade-in', 'slide-in-left', 'slide-in-right', 
      'scale-in', 'bounce-in', 'flip-in', 'slide-up'
    ];
    return animationClasses.some(className => element.classList.contains(className));
  }
  
  function observeElements() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animationType = entry.target.dataset.animation || 'fade-in';
            entry.target.classList.add(animationType);
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      animatedElements.forEach(element => {
        const animationType = element.dataset.animation || 'fade-in';
        element.classList.add(animationType);
        element.style.opacity = "1";
      });
    }
  }