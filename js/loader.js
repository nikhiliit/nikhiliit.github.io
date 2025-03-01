// loader.js - Enhanced loading animation with 3D cube effect

document.addEventListener('DOMContentLoaded', () => {
    createLoader();
    setupInitialPageLoad();
});

function createLoader() {
    // Create loader if it doesn't exist
    if (!document.querySelector('.page-loader')) {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        
        // Create container for the 3D cube
        const cubeContainer = document.createElement('div');
        cubeContainer.className = 'cube-container';
        
        // Create the 3D cube
        const cube = document.createElement('div');
        cube.className = 'cube';
        
        // Create the 6 faces of the cube
        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        faces.forEach(face => {
            const cubeFace = document.createElement('div');
            cubeFace.className = `cube-face cube-face-${face}`;
            
            // Add the logo or initial to each face
            const initial = document.createElement('span');
            initial.textContent = 'N';
            cubeFace.appendChild(initial);
            
            cube.appendChild(cubeFace);
        });
        
        cubeContainer.appendChild(cube);
        
        // Create progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        progressContainer.appendChild(progressBar);
        
        // Create loader text
        const text = document.createElement('div');
        text.className = 'loader-text';
        text.innerHTML = 'Loading<span class="dot-animation"><span>.</span><span>.</span><span>.</span></span>';
        
        // Append elements
        loader.appendChild(cubeContainer);
        loader.appendChild(progressContainer);
        loader.appendChild(text);
        document.body.appendChild(loader);
        
        // Add necessary styles
        addLoaderStyles();
    }
}

function addLoaderStyles() {
    // Check if styles already exist
    if (document.getElementById('loader-custom-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'loader-custom-styles';
    styleSheet.innerHTML = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .page-loader.active {
            opacity: 1;
            visibility: visible;
        }
        
        .page-loader.initial-load {
            background: linear-gradient(135deg, #4831D4 0%, #3621B0 100%);
        }
        
        .page-loader.initial-load .loader-text {
            color: white;
        }
        
        /* Cube Container */
        .cube-container {
            width: 100px;
            height: 100px;
            perspective: 800px;
            margin-bottom: 30px;
        }
        
        /* Cube */
        .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: rotateCube 6s infinite ease-in-out;
        }
        
        /* Cube Faces */
        .cube-face {
            position: absolute;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: 700;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .page-loader.initial-load .cube-face {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        }
        
        .cube-face-front {
            transform: translateZ(50px);
            background: #4831D4;
            color: white;
        }
        
        .cube-face-back {
            transform: rotateY(180deg) translateZ(50px);
            background: #3621B0;
            color: white;
        }
        
        .cube-face-right {
            transform: rotateY(90deg) translateZ(50px);
            background: #6045FF;
            color: white;
        }
        
        .cube-face-left {
            transform: rotateY(-90deg) translateZ(50px);
            background: #3D28B1;
            color: white;
        }
        
        .cube-face-top {
            transform: rotateX(90deg) translateZ(50px);
            background: #5A3FE8;
            color: white;
        }
        
        .cube-face-bottom {
            transform: rotateX(-90deg) translateZ(50px);
            background: #2D1B94;
            color: white;
        }
        
        /* Progress Bar */
        .progress-container {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            margin-bottom: 15px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            width: 0%;
            background: #4831D4;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        .page-loader.initial-load .progress-bar {
            background: white;
        }
        
        /* Loader Text */
        .loader-text {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            font-weight: 500;
            color: #4831D4;
            display: flex;
            align-items: center;
        }
        
        /* Dots Animation */
        .dot-animation span {
            opacity: 0;
            animation: dotAnimation 1.5s infinite;
        }
        
        .dot-animation span:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .dot-animation span:nth-child(3) {
            animation-delay: 1s;
        }
        
        /* Animations */
        @keyframes rotateCube {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            20% { transform: rotateX(90deg) rotateY(0deg); }
            40% { transform: rotateX(180deg) rotateY(90deg); }
            60% { transform: rotateX(270deg) rotateY(180deg); }
            80% { transform: rotateX(360deg) rotateY(270deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes dotAnimation {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    
    document.head.appendChild(styleSheet);
}

function setupInitialPageLoad() {
    // Show initial page load animation
    window.addEventListener('load', () => {
        console.log('Window loaded - starting to hide loader');
        // Update progress bar to 100% on complete load
        updateProgress(100);
        
        // Hide initial page loader after everything has loaded
        const loader = document.querySelector('.page-loader');
        const preloader = document.querySelector('.preloader');
        
        if (loader && loader.classList.contains('initial-load')) {
            setTimeout(() => {
                console.log('Removing loader classes');
                loader.classList.remove('active', 'initial-load');
            }, 800);
        }
        
        // Also handle the preloader element if it exists
        if (preloader) {
            setTimeout(() => {
                console.log('Hiding preloader element');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);
        }
    });
    
    // Show loader immediately on first page load
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('active', 'initial-load');
        
        // Simulate progress for initial load
        simulateProgress();
    }
}

function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 90) {
            clearInterval(interval);
            // The remaining progress will be filled when the page is actually loaded
            
            // Force complete loading after a timeout (failsafe)
            setTimeout(() => {
                updateProgress(100);
                const loader = document.querySelector('.page-loader');
                const preloader = document.querySelector('.preloader');
                
                if (loader) {
                    loader.classList.remove('active', 'initial-load');
                }
                
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 5000); // 5 second failsafe
        } else {
            updateProgress(progress);
        }
    }, 200);
}

function updateProgress(progress) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// Function to manually trigger the loader (can be called from other scripts)
function showLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('active');
        
        // Reset and start progress animation
        updateProgress(0);
        simulateProgress();
    }
    
    return loader;
}

// Function to manually hide the loader with a delay
function hideLoader(delay = 0) {
    updateProgress(100);
    
    const loader = document.querySelector('.page-loader');
    
    if (loader) {
        if (delay > 0) {
            setTimeout(() => {
                loader.classList.remove('active');
            }, delay);
        } else {
            loader.classList.remove('active');
        }
    }
    
    // Also hide the preloader if it exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Debug helper - logs loading information to console
function logLoaderStatus() {
    console.log('Loader.js: Checking status');
    const loader = document.querySelector('.page-loader');
    const preloader = document.querySelector('.preloader');
    
    console.log('Page-loader element exists:', !!loader);
    console.log('Preloader element exists:', !!preloader);
    
    if (loader) {
        console.log('Loader classes:', loader.className);
    }
    
    if (preloader) {
        console.log('Preloader style:', preloader.style.opacity, preloader.style.display);
    }
}

// Add an absolute failsafe
setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    const preloader = document.querySelector('.preloader');
    
    if (loader) {
        console.log('Failsafe: Removing page-loader');
        loader.classList.remove('active', 'initial-load');
    }
    
    if (preloader) {
        console.log('Failsafe: Removing preloader');
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
}, 8000); // 8-second absolute failsafe

// Expose functions globally
window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.logLoaderStatus = logLoaderStatus;