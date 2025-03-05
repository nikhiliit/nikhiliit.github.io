// In preloader.js
function simulateLoading() {
    const progressBar = document.querySelector('.preloader .progress-bar');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            hidePreloader(); // This function should properly hide the preloader
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 30);
}

function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 500);
    }
}