document.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const slider = document.querySelector('.blockhood-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots for navigation
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', index);
            dotsContainer.appendChild(dot);
        });
    }
    
    // Update slide position
    function updateSlider() {
        // Move slider
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        updateSlider();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Dot navigation
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('slider-dot')) {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            goToSlide(slideIndex);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Auto-advance slides (optional)
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });
    
    // Initialize slider
    createDots();
    updateSlider();
});
