// text-effects.js - Creates special text effects like glowing/highlighting
document.addEventListener('DOMContentLoaded', function() {
    initTextEffects();
  });
  
  function initTextEffects() {
    // Find headings to apply effects to
    applyGlowEffect();
    applyHighlightEffect();
  }
  
  function applyGlowEffect() {
    // Apply to specific headings like page titles
    const headings = document.querySelectorAll('.page-hero h1, .hero-text h1');
    
    headings.forEach(heading => {
      // Skip if already processed
      if (heading.classList.contains('text-effect-applied')) return;
      
      // Find span elements to emphasize
      const spans = heading.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.add('glow-text');
      });
      
      heading.classList.add('text-effect-applied');
    });
  }
  
  function applyHighlightEffect() {
    // Apply highlighting animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title h2');
    
    sectionTitles.forEach(title => {
      // Skip if already processed
      if (title.classList.contains('text-effect-applied')) return;
      
      title.classList.add('highlight-text');
      title.classList.add('text-effect-applied');
    });
  }