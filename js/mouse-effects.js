// mouse-effects.js - Adds a custom cursor effect that follows mouse
document.addEventListener('DOMContentLoaded', function() {
    initMouseEffects();
  });
  
  function initMouseEffects() {
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return; // Don't add cursor effect on touch devices
    
    const body = document.querySelector('body');
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animate() {
      // Smooth follow effect
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      '.btn, .portfolio-item, .social-icon, .nav-links a, .project-card, .service-card, .filter-btn'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursor.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', function() {
        cursor.classList.remove('cursor-hover');
      });
    });
  }