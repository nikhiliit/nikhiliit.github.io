// interactive-cards.js - Adds tilt effect to cards on mouse movement
document.addEventListener('DOMContentLoaded', function() {
    initCardInteractions();
  });
  
  function initCardInteractions() {
    const cards = document.querySelectorAll('.service-card, .project-card, .portfolio-item');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        // Check if device supports hover
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        // Apply the 3D transform
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        // Reset transform on mouse leave
        this.style.transform = '';
      });
    });
  }