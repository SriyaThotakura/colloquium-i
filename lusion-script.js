// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background blur effect when scrolling
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .section-header, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
});

// Enhanced project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const canvas = card.querySelector('.canvas-placeholder');
    const content = card.querySelector('.canvas-content');
    
    card.addEventListener('mouseenter', () => {
        // Add subtle animation to canvas content
        if (content) {
            content.style.transform = 'scale(1.05)';
            content.style.transition = 'transform 0.3s ease';
        }
        
        // Add glow effect to canvas
        if (canvas) {
            canvas.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (content) {
            content.style.transform = 'scale(1)';
        }
        
        if (canvas) {
            canvas.style.boxShadow = 'none';
        }
    });
});

// Canvas placeholder interactive effects
const canvasPlaceholders = document.querySelectorAll('.canvas-placeholder');

canvasPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', () => {
        const dots = placeholder.querySelectorAll('.grid-dot');
        const lines = placeholder.querySelectorAll('.pattern-line');
        
        // Animate dots faster on hover
        dots.forEach((dot, index) => {
            dot.style.animationDuration = '1s';
            dot.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Animate lines faster on hover
        lines.forEach((line, index) => {
            line.style.animationDuration = '1.5s';
            line.style.animationDelay = `${index * 0.3}s`;
        });
    });
    
    placeholder.addEventListener('mouseleave', () => {
        const dots = placeholder.querySelectorAll('.grid-dot');
        const lines = placeholder.querySelectorAll('.pattern-line');
        
        // Reset dot animations
        dots.forEach((dot, index) => {
            dot.style.animationDuration = '2s';
            dot.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Reset line animations
        lines.forEach((line, index) => {
            line.style.animationDuration = '3s';
            line.style.animationDelay = `${index * 1}s`;
        });
    });
});

// Cursor follower effect for hero section
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const heroCanvas = hero.querySelector('.hero-canvas');
        if (heroCanvas) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            heroCanvas.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const heroCanvas = hero.querySelector('.hero-canvas');
        if (heroCanvas) {
            heroCanvas.style.transform = 'translate(0, 0)';
        }
    });
}

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-canvas, .about-canvas');
    
    parallaxElements.forEach(element => {
        const speed = 0.2;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide initial loading if needed
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// Contact form enhancement (if form is added later)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Enhanced CTA button effects
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-heavy operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Create stellar particles
function createStellarParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'stellar-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize stellar particles when page loads
document.addEventListener('DOMContentLoaded', () => {
    createStellarParticles();
});

// Enhanced galactic cursor effect
// mouseX and mouseY are already declared elsewhere
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail effect
    if (Math.random() > 0.95) {
        createCursorStar(mouseX, mouseY);
    }
});

function createCursorStar(x, y) {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'radial-gradient(circle, #87ceeb, transparent)';
    star.style.borderRadius = '50%';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '9999';
    star.style.boxShadow = '0 0 6px #87ceeb';
    star.style.animation = 'starFade 1s ease-out forwards';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 1000);
}

// Add keyframes for star fade animation
const starFadeKeyframes = `
    @keyframes starFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = starFadeKeyframes;
document.head.appendChild(styleSheet);

// Enhanced canvas interactions with cosmic effects
const enhancedCanvasPlaceholders = document.querySelectorAll('.canvas-placeholder');

enhancedCanvasPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', (e) => {
        // Create expanding cosmic ripple
        const ripple = document.createElement('div');
        const rect = placeholder.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.border = '2px solid rgba(135, 206, 235, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'cosmicRipple 1s ease-out forwards';
        
        placeholder.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Add cosmic ripple keyframes
const cosmicRippleKeyframes = `
    @keyframes cosmicRipple {
        0% {
            transform: scale(0);
            opacity: 1;
            box-shadow: 0 0 20px rgba(135, 206, 235, 0.8);
        }
        100% {
            transform: scale(1);
            opacity: 0;
            box-shadow: 0 0 40px rgba(135, 206, 235, 0.2);
        }
    }
`;

styleSheet.textContent += cosmicRippleKeyframes;

// Enhanced Parallax Scrolling System
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    // Update scroll progress bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        const scrollPercent = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    // Hero canvas transition effects
    const heroCanvas = document.querySelector('.hero-canvas');
    const hero = document.querySelector('.hero');
    if (heroCanvas && hero) {
        const heroHeight = hero.offsetHeight;
        const heroProgress = Math.min(scrolled / heroHeight, 1);
        
        // Enhanced parallax with depth effect
        const heroSpeed = 0.4 + (heroProgress * 0.3);
        const yPos = -(scrolled * heroSpeed);
        const scale = Math.max(0.8, 1 - (heroProgress * 0.2));
        const opacity = Math.max(0.3, 0.8 - (heroProgress * 0.3));
        
        // Add a subtle rotation effect on scroll
        const rotation = heroProgress * 0.5; // subtle rotation in degrees
        
        // Enhanced diving effect with easing
        const diveEffect = Math.pow(heroProgress, 1.8) * 120;
        
        // Apply transforms with perspective for depth
        heroCanvas.style.transform = `
            translate3d(0, ${yPos - diveEffect}px, 0)
            scale(${scale})
            rotate(${rotation}deg)
            perspective(1000px)
            translateZ(${heroProgress * 100}px)
        `;
        
        heroCanvas.style.opacity = opacity;
        heroCanvas.style.willChange = 'transform, opacity';
        
        // Dynamic blur and brightness based on scroll
        const blurAmount = Math.min(heroProgress * 8, 10);
        const brightness = Math.max(0.5, 1 - (heroProgress * 0.5));
        heroCanvas.style.filter = `blur(${blurAmount}px) brightness(${brightness})`;
        
        // Add a subtle background color shift
        const colorIntensity = Math.min(heroProgress * 50, 10);
        heroCanvas.style.backgroundColor = `rgba(10, 10, 20, ${0.1 + (heroProgress * 0.3)})`;
    }
    
    // Enhanced hero content parallax with depth and smooth transitions
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && hero) {
        const heroHeight = hero.offsetHeight;
        const heroProgress = Math.min(scrolled / heroHeight, 1);
        
        // Dynamic speed based on scroll progress
        const contentSpeed = 0.2 + (heroProgress * 0.1);
        const yPos = -(scrolled * contentSpeed);
        
        // Smoother exit transition for hero content
        const exitStart = windowHeight * 0.1; // Start fading earlier
        const exitEnd = windowHeight * 0.6;   // End fading later
        let exitProgress = 0;
        
        if (scrolled > exitStart) {
            exitProgress = Math.min(1, (scrolled - exitStart) / (exitEnd - exitStart));
        }
        
        // Enhanced opacity and scale with easing
        const opacity = 1 - (exitProgress * exitProgress); // Quadratic easing for smoother fade
        const scale = 1 - (exitProgress * 0.3);
        
        // Add subtle 3D tilt effect
        const tiltX = (Math.sin(heroProgress * Math.PI) * 2);
        const tiltY = (Math.cos(heroProgress * Math.PI) * 1.5);
        
        // Apply transforms with 3D perspective
        heroContent.style.transform = `
            translate3d(0, ${yPos}px, 0)
            scale(${scale})
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            perspective(1000px)
            translateZ(${exitProgress * 50}px)
        `;
        
        heroContent.style.opacity = opacity;
        heroContent.style.willChange = 'transform, opacity';
        
        // Add text shadow for better readability during transitions
        const textShadowIntensity = Math.min(exitProgress * 10, 5);
        heroContent.style.textShadow = `0 ${textShadowIntensity}px ${textShadowIntensity * 2}px rgba(0, 0, 0, ${0.3 + (exitProgress * 0.7)})`;
        
        // Adjust text color slightly based on scroll
        const textColorIntensity = Math.min(exitProgress * 100, 30);
        heroContent.style.color = `rgba(255, 255, 255, ${1 - (exitProgress * 0.5)})`;
    }
    
    // Project cards parallax with entrance animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowBottom = scrolled + windowHeight;
        
        // Only animate if element is in view
        if (elementTop < windowBottom && (elementTop + elementHeight) > scrolled) {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrolled - elementTop) * speed;
            
            // Calculate visibility percentage for entrance effects
            const visibilityStart = elementTop - windowHeight;
            const visibilityEnd = elementTop + elementHeight;
            const visibilityRange = visibilityEnd - visibilityStart;
            const currentPosition = scrolled - visibilityStart;
            const visibilityPercent = Math.max(0, Math.min(1, currentPosition / visibilityRange));
            
            // Canvas parallax within cards with scale effect
            const canvas = card.querySelector('.project-canvas');
            if (canvas) {
                const canvasScale = 0.95 + (visibilityPercent * 0.05);
                canvas.style.transform = `translateY(${yPos}px) scale(${canvasScale}) translateZ(0)`;
                canvas.style.opacity = Math.max(0.7, visibilityPercent);
            }
            
            // Info panel parallax with slide-in effect
            const info = card.querySelector('.project-info');
            if (info) {
                const infoSpeed = speed * 0.5;
                const infoYPos = -(scrolled - elementTop) * infoSpeed;
                const slideInOffset = (1 - visibilityPercent) * 50;
                info.style.transform = `translateY(${infoYPos}px) translateX(${slideInOffset}px) translateZ(0)`;
                info.style.opacity = visibilityPercent;
            }
        }
    });
    
    // Stellar particles parallax
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.02 + (index % 5) * 0.01;
        const yPos = scrolled * speed;
        const rotation = (scrolled * 0.05) % 360;
        particle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg) translateZ(0)`;
    });
    
    // Enhanced work section entrance transition with smooth scroll from hero
    const workSection = document.querySelector('.work-section');
    if (workSection && hero) {
        const heroHeight = hero.offsetHeight;
        const workSectionTop = workSection.offsetTop;
        
        // Define transition zones
        const heroExitStart = 0;
        const heroExitEnd = heroHeight * 0.8;
        const workEnterStart = heroHeight * 0.5;
        const workEnterEnd = heroHeight * 1.2;
        
        // Calculate progress through the transition
        const heroProgress = Math.min(1, Math.max(0, (scrolled - heroExitStart) / (heroExitEnd - heroExitStart)));
        const workProgress = Math.min(1, Math.max(0, (scrolled - workEnterStart) / (workEnterEnd - workEnterStart)));
        
        // Hero section exit animation
        if (scrolled >= heroExitStart && scrolled <= heroExitEnd) {
            // Continue hero exit animation
            const heroExitScale = 0.9 + (0.1 * (1 - heroProgress));
            const heroExitY = heroProgress * 50; // Move down slightly
            
            hero.style.transform = `translateY(${heroExitY}px) scale(${heroExitScale})`;
            hero.style.opacity = 1 - (heroProgress * 0.5);
            hero.style.willChange = 'transform, opacity';
        }
        
        // Work section enter animation
        if (scrolled >= workEnterStart) {
            // Smooth scale and fade in
            const workScale = 0.95 + (workProgress * 0.05);
            const workOpacity = Math.min(1, workProgress * 1.5);
            const workY = (1 - workProgress) * 50; // Move up slightly
            
            workSection.style.opacity = workOpacity;
            workSection.style.transform = `translateY(${workY}px) scale(${workScale}) translateZ(0)`;
            workSection.style.willChange = 'transform, opacity';
            
            // Add a subtle background transition
            const bgDarkness = Math.min(workProgress * 0.2, 0.1);
            workSection.style.backgroundColor = `rgba(10, 10, 15, ${bgDarkness})`;
            
            // Add a subtle border radius that decreases as section comes into view
            const borderRadius = 20 * (1 - workProgress);
            workSection.style.borderRadius = `${borderRadius}px ${borderRadius}px 0 0`;
            workSection.style.overflow = 'hidden';
        }
        
        // Add a subtle shadow that appears as the work section comes into view
        if (scrolled > workEnterStart) {
            const shadowIntensity = Math.min(workProgress * 20, 10);
            workSection.style.boxShadow = `0 -${shadowIntensity}px ${shadowIntensity * 2}px rgba(0, 0, 0, 0.3)`;
        }
    }
    
    // Section headers parallax with entrance
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        const rect = header.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 0.08;
            const yPos = -(scrolled - elementTop) * speed;
            
            // Add entrance effect
            const entranceProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            const entranceScale = 0.9 + (entranceProgress * 0.1);
            const entranceOpacity = entranceProgress;
            
            header.style.transform = `translateY(${yPos}px) scale(${entranceScale}) translateZ(0)`;
            header.style.opacity = entranceOpacity;
        }
    });
    
    // Nebula background rotation (using existing hero reference)
    if (hero) {
        const rotationSpeed = scrolled * 0.02;
        hero.style.setProperty('--nebula-rotation', `${rotationSpeed}deg`);
    }
    
    // Navigation background blur based on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const blurAmount = Math.min(scrolled / 100, 1);
        const opacity = 0.95 + (blurAmount * 0.05);
        navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        navbar.style.backdropFilter = `blur(${20 + (blurAmount * 20)}px)`;
    }
    
    // Story sections scroll animations
    const storySections = document.querySelectorAll('.story-section');
    storySections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const content = section.querySelector('.story-content');
        
        if (content) {
            // Check if section is in viewport
            const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
            
            if (isVisible && !content.classList.contains('animate-in')) {
                // Stagger animation delays for multiple elements in section
                const elements = content.querySelectorAll('h2, h3, p, .question-item, .keyword, .field-item, .method-category, .tool-category');
                elements.forEach((element, elemIndex) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, elemIndex * 100);
                });
                
                content.classList.add('animate-in');
            }
            
            // Add parallax to story sections
            if (rect.top < windowHeight && rect.bottom > 0) {
                const parallaxSpeed = 0.05;
                const yPos = -(scrolled - section.offsetTop) * parallaxSpeed;
                content.style.transform = `translateY(${yPos}px) translateZ(0)`;
            }
        }
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Optimized scroll listener
window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

// Initial parallax setup
document.addEventListener('DOMContentLoaded', () => {
    updateParallax();
});

// Handle iframe loading
function handleIframeLoading() {
    const iframes = document.querySelectorAll('.canvas-iframe, .hero-iframe');
    
    iframes.forEach(iframe => {
        // Add loading state
        iframe.style.background = 'rgba(184, 169, 255, 0.1)';
        iframe.style.position = 'relative';
        
        // Handle load success
        iframe.onload = function() {
            console.log('✅ Canvas loaded:', iframe.src);
            iframe.style.background = 'transparent';
        };
        
        // Handle load error
        iframe.onerror = function() {
            console.log('❌ Canvas failed to load:', iframe.src);
            iframe.style.background = 'rgba(184, 169, 255, 0.1)';
            
            // Create fallback content
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #b8a9ff;
                text-align: center;
                font-size: 14px;
                z-index: 10;
            `;
            fallback.innerHTML = `
                <div>⚠️ Canvas Unavailable</div>
                <div style="font-size: 12px; opacity: 0.7; margin-top: 5px;">
                    ${iframe.src.split('/').pop()}
                </div>
            `;
            
            if (iframe.parentNode) {
                iframe.parentNode.appendChild(fallback);
            }
        };
        
        // Force reload if src is set
        if (iframe.src) {
            const originalSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = originalSrc;
            }, 100);
        }
    });
}

// Initialize iframe handling
document.addEventListener('DOMContentLoaded', () => {
    handleIframeLoading();
});

// Debug helper (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🌌 Galactic Lusion-style website loaded successfully');
    console.log('⭐ Stellar particles activated');
    console.log('🌠 Cosmic interactions enabled');
    console.log('✨ Galaxy animations running');
    console.log('🖼️ Canvas iframe handlers initialized');
}