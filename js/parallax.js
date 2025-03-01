// parallax.js - Creates parallax scrolling effects for background elements
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
  });
  
  function initParallax() {
    // Add parallax class to sections that should have the effect
    const parallaxSections = [
      '.cta',
      '.page-hero'
    ];
    
    parallaxSections.forEach(selector => {
      const sections = document.querySelectorAll(selector);
      sections.forEach(section => {
        if (!section.classList.contains('parallax-bg')) {
          section.classList.add('parallax-bg');
        }
      });
    });
    
    // Create parallax elements that will move at different speeds
    createParallaxElements();
    
    // Add scroll listener for parallax effect
    window.addEventListener('scroll', function() {
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
  
  function createParallaxElements() {
    // Create floating shapes for parallax effect
    const parallaxContainers = document.querySelectorAll('.parallax-bg');
    
    parallaxContainers.forEach(container => {
      // Only add elements if they don't already exist
      if (container.querySelector('.parallax-element')) return;
      
      // Add 3-5 random shapes
      const numShapes = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'parallax-element parallax-shape';
        
        // Random properties
        const size = Math.floor(Math.random() * 100) + 50;
        const opacity = Math.random() * 0.2 + 0.05;
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 80 + 10;
        const speed = Math.random() * 0.4 + 0.1;
        const shapeType = Math.floor(Math.random() * 3);
        
        // Set styles
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.opacity = opacity;
        shape.style.left = `${left}%`;
        shape.style.top = `${top}%`;
        
        // Set shape
        if (shapeType === 0) {
          shape.style.borderRadius = '50%';
        } else if (shapeType === 1) {
          shape.style.borderRadius = '0';
          shape.style.transform = `rotate(${Math.random() * 45}deg)`;
        } else {
          shape.style.borderRadius = '50% 0 50% 0';
        }
        
        // Set data attribute for scroll speed
        shape.dataset.speed = speed;
        
        container.appendChild(shape);
      }
    });
  }