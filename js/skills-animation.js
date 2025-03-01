// skills-animation.js - Animates skill progress bars when scrolled into view
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimation();
  });
  
  function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (skillItems.length === 0) return;
    
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.skill-progress');
      const percentText = item.querySelector('.skill-name span:last-child').textContent;
      const percent = parseFloat(percentText);
      
      // Set CSS variable for the animation to use
      progressBar.style.setProperty('--skill-percent', `${percent}%`);
    });
    
    // Use Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          progressBar.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
      observer.observe(item);
    });
  }