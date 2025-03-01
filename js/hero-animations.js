// hero-animations.js - Adds floating tech icons to hero section
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
  });
  
  function initHeroAnimations() {
    // Create floating elements
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Add floating elements
    const floatingElements = [
      { icon: 'fa-code', size: 30, delay: 0 },
      { icon: 'fa-database', size: 25, delay: 1 },
      { icon: 'fa-laptop-code', size: 35, delay: 2 },
      { icon: 'fa-terminal', size: 20, delay: 1.5 },
      { icon: 'fa-code-branch', size: 28, delay: 0.5 }
    ];
    
    floatingElements.forEach((element, index) => {
      const floatingEl = document.createElement('i');
      floatingEl.className = `fas ${element.icon} floating-icon`;
      floatingEl.style.fontSize = `${element.size}px`;
      floatingEl.style.animationDelay = `${element.delay}s`;
      floatingEl.style.left = `${Math.random() * 80 + 10}%`;
      floatingEl.style.top = `${Math.random() * 60 + 10}%`;
      
      heroSection.appendChild(floatingEl);
    });
  }