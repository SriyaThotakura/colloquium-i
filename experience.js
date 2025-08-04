document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heroTitle = document.getElementById('enterExperience');
    const heroCanvas = document.getElementById('heroCanvas');
    const experienceSections = document.querySelector('.experience-sections');
    const architecturalSteps = document.getElementById('architecturalSteps');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const stepsContainer = document.querySelector('.steps-container');
    const steps = document.querySelectorAll('.step');
    
    // State
    let isInExperience = false;
    let currentStep = 0;
    let isScrolling = false;
    let isUserScrolling = false;
    let scrollTimeout;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchMoved = false;
    let archViz = null;

    // Initialize 3D visualization
    function initArchitecturalVisualization() {
        if (archViz) return;
        archViz = new ArchitecturalVisualization(architecturalSteps);
        architecturalSteps.classList.add('active');
    }

    // Enter experience mode
    function enterExperience() {
        document.body.classList.add('experience-mode');
        heroCanvas.classList.add('active');
        experienceSections.classList.add('active');
        isInExperience = true;
        currentStep = 0;
        
        // Initialize 3D visualization
        initArchitecturalVisualization();
        
        // Update steps visibility
        updateSteps();
        
        // Scroll to first step
        scrollToStep(0);
    }

    // Update steps visibility based on scroll position
    function updateSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('active', 'passed', 'next');
            
            if (index === currentStep) {
                step.classList.add('active');
            } else if (index < currentStep) {
                step.classList.add('passed');
            } else {
                step.classList.add('next');
            }
        });
        
        // Update 3D visualization
        if (archViz) {
            archViz.updateSteps(Math.floor(currentStep / 3));
        }
    }

    // Calculate which step should be active based on scroll position
    function updateActiveStep() {
        if (isScrolling) return;
        
        const scrollPosition = window.scrollY + (window.innerHeight * 0.4);
        let newStep = currentStep;
        
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            const stepTop = rect.top + window.scrollY;
            
            if (scrollPosition >= stepTop) {
                newStep = index;
            }
        });
        
        if (newStep !== currentStep) {
            currentStep = newStep;
            updateSteps();
        }
        
        // Update zoom based on scroll position
        updateZoom();
    }

    // Update zoom based on scroll position
    function updateZoom() {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const zoom = 1 - (scrollPercentage * 0.5);
        document.documentElement.style.setProperty('--zoom', zoom);
    }

    // Update steps based on scroll position
    function updateFromScroll() {
        if (isScrolling || !isInExperience) return;
        
        clearTimeout(scrollTimeout);
        isUserScrolling = true;
        
        updateActiveStep();
        
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 100);
    }

    // Update progress bar
    function updateProgressBar(progress) {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Smooth scroll to specific step
    function scrollToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;
        
        isScrolling = true;
        currentStep = stepIndex;
        
        // Update URL hash
        window.location.hash = `step-${stepIndex + 1}`;
        
        // Scroll to step
        const targetStep = steps[stepIndex];
        const targetPosition = targetStep.offsetTop - (window.innerHeight * 0.3);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update steps after scroll
        updateSteps();
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    // Handle mouse wheel for scrolling through steps (3 steps per scroll)
    let wheelDelta = 0;
    let wheelTimeout;
    
    function handleWheel(e) {
        if (!isInExperience) return;
        
        e.preventDefault();
        
        wheelDelta += e.deltaY;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            const direction = wheelDelta > 0 ? 1 : -1;
            const stepChange = direction * 3; // 3 steps per scroll
            
            scrollToStep(Math.max(0, Math.min(steps.length - 1, currentStep + stepChange)));
            
            wheelDelta = 0;
        }, 50);
    }
    
    // Event Listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle keyboard navigation with smooth transitions
    document.addEventListener('keydown', (e) => {
        if (!isInExperience) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                updateStep(currentStep + 1);
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                updateStep(currentStep - 1);
                break;
            case 'Home':
                e.preventDefault();
                updateStep(0);
                break;
            case 'End':
                e.preventDefault();
                updateStep(steps.length - 1);
                break;
            case 'Escape':
                exitExperience();
                break;
        }
    });
    
    // Handle touch events for mobile with momentum scrolling
    document.addEventListener('touchstart', (e) => {
        if (!isInExperience) return;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        touchMoved = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (!isInExperience) return;
        touchMoved = true;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!isInExperience || !touchMoved) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const deltaY = touchStartY - touchEndY;
        const deltaTime = touchEndTime - touchStartTime;
        
        // Only handle swipes that are fast enough
        if (deltaTime < 300 && Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                // Swipe up - go to next step
                updateStep(currentStep + 1);
            } else {
                // Swipe down - go to previous step
                updateStep(currentStep - 1);
            }
        }
    }, { passive: true });
    
    // Handle popstate (back/forward navigation)
    window.addEventListener('popstate', () => {
        if (window.location.hash) {
            const match = window.location.hash.match(/step-(\d+)/);
            if (match) {
                const step = parseInt(match[1], 10) - 1;
                if (step >= 0 && step < steps.length) {
                    scrollToStep(step);
                }
            }
        } else if (isInExperience) {
            // Exit experience if no hash is present
            exitExperience();
        }
    });
    
    // Update step based on URL hash on page load
    if (window.location.hash) {
        const match = window.location.hash.match(/step-(\d+)/);
        if (match) {
            const step = parseInt(match[1], 10) - 1;
            if (step >= 0 && step < steps.length) {
                currentStep = step;
                updateSteps();
            }
        }
    }
    
    // Initialize event listeners for entering the experience
    if (heroTitle) {
        heroTitle.addEventListener('click', enterExperience);
    }
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', enterExperience);
    }
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        updateProgressBar(progress);
        
        if (isInExperience) {
            updateFromScroll();
        }
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (archViz) {
            archViz.onWindowResize();
        }
    });
});
