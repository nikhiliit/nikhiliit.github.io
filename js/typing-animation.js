// typing-animation.js - Adds typing effect to introduction
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
  });
  
  function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const roles = [
      'AI Researcher and a upcoming PhD student',
      'Computer Vision Expert',
      'Multimodal Learning Specialist',
      'Research Scientist',
      'ML Engineer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting text
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Typing text
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }
      
      // Change direction from typing to deleting
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end of typing
      } 
      // Change direction from deleting to typing next phrase
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing new role
      }
      
      setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typing animation
    typeWriter();
  }