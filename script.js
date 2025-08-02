// Slideshow functionality
let currentSlide = 0;
const slides = [];
let totalSlides = 0;

// Slide titles for navigation
const slideTitles = [
    'Portal',
    'Research',
    'Methods', 
    'Design',
    'Materials',
    'Community'
];

// Initialize slideshow when page loads
window.addEventListener('load', () => {
    initializeSlideshow();
    createNetworkGraph();
    initializeCanvasSimulation();
    
    // Temporary: Test slide visibility
    setTimeout(() => {
        console.log('Testing slide visibility...');
        for (let i = 0; i < totalSlides; i++) {
            console.log(`Slide ${i}:`, slides[i] ? 'exists' : 'missing');
            if (slides[i]) {
                console.log(`  - Display: ${slides[i].style.display}`);
                console.log(`  - Classes: ${slides[i].className}`);
            }
        }
    }, 1000);
});

// Initialize slideshow functionality
function initializeSlideshow() {
    const slideElements = document.querySelectorAll('.slide');
    totalSlides = slideElements.length;
    
    console.log('Found', totalSlides, 'slides');
    
    // Store slide elements
    slideElements.forEach((slide, index) => {
        slides[index] = slide;
        slide.style.display = index === 0 ? 'block' : 'none';
        console.log('Slide', index, 'display:', slide.style.display);
    });
    
    // Set initial state
    currentSlide = 0;
    updateNavigationState();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Update dropdown
    updateDropdown();
}

// Navigate to specific slide
function goToSlide(slideIndex) {
    const index = parseInt(slideIndex);
    console.log('goToSlide called with index:', index, 'totalSlides:', totalSlides);
    
    if (index < 0 || index >= totalSlides) {
        console.log('Invalid slide index');
        return;
    }
    
    // Hide current slide with animation
    if (slides[currentSlide]) {
        console.log('Hiding slide', currentSlide);
        slides[currentSlide].classList.remove('active');
        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
        }, 200);
    }
    
    // Show new slide with animation
    currentSlide = index;
    console.log('Showing slide', currentSlide);
    setTimeout(() => {
        slides[currentSlide].style.display = 'block';
        requestAnimationFrame(() => {
            slides[currentSlide].classList.add('active');
        });
    }, 200);
    
    updateNavigationState();
    updateDropdown();
    
    // Only update simulation state if it exists
    if (typeof updateSimulationState === 'function') {
        updateSimulationState();
    }
    
    // Update URL without page reload
    const newUrl = currentSlide === 0 ? '/portal' : `/${slideTitles[currentSlide].toLowerCase()}`;
    history.pushState({ slide: currentSlide }, '', window.location.origin + window.location.pathname + '#' + slideTitles[currentSlide].toLowerCase());
}

// Previous slide
function previousSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Next slide  
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

// Update navigation button states
function updateNavigationState() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSection = document.getElementById('currentSection');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    if (currentSection) {
        currentSection.textContent = slideTitles[currentSlide] || 'Portal';
    }
}

// Update dropdown selection
function updateDropdown() {
    const dropdown = document.getElementById('sectionDropdown');
    if (dropdown) {
        dropdown.value = currentSlide;
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    // Only handle keyboard navigation if not typing in an input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'SELECT') {
        return;
    }
    
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            previousSlide();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
            event.preventDefault();
            nextSlide();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        case 'Escape':
            // Could be used to exit fullscreen or reset view
            event.preventDefault();
            goToSlide(0);
            break;
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navCenter = document.querySelector('.nav-center');
    if (navCenter) {
        navCenter.style.display = navCenter.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.slide !== undefined) {
        goToSlide(event.state.slide);
    }
});

// Smooth scroll behavior for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Legacy function support for any remaining onclick handlers
function showSection(sectionId) {
    const sectionMap = {
        'research': 1,
        'methods': 2,
        'design': 3,
        'materials': 4,
        'community': 5
    };
    
    const slideIndex = sectionMap[sectionId];
    if (slideIndex !== undefined) {
        goToSlide(slideIndex);
    }
}

// Create network graph visualization (updated for new color scheme)
function createNetworkGraph() {
    const container = document.getElementById('network-graph');
    if (!container) return;

    // Graph data
    const graph = {
        nodes: [
            { id: "Titan Terrain Data", type: "Data Source" },
            { id: "Mars MOLA DEM", type: "Data Source" },
            { id: "Methane Lakes", type: "Geographic Feature" },
            { id: "Robot Infrastructure", type: "System Component" },
            { id: "Bio-mimicry Organisms", type: "System Component" },
            { id: "Cyborg Ecosystem", type: "System Layer" },
            { id: "Planetary Urbanism", type: "Theme" },
            { id: "Post-Human Society", type: "Theme" },
            { id: "Energy Flows", type: "Dynamic Process" },
            { id: "Data Loops", type: "Dynamic Process" },
            { id: "Game Simulation", type: "Platform" },
            { id: "Vertical Datascape Drawing", type: "Output" },
            { id: "Material Gesture Model", type: "Output" }
        ],
        links: [
            { source: "Titan Terrain Data", target: "Methane Lakes" },
            { source: "Mars MOLA DEM", target: "Robot Infrastructure" },
            { source: "Methane Lakes", target: "Bio-mimicry Organisms" },
            { source: "Robot Infrastructure", target: "Cyborg Ecosystem" },
            { source: "Bio-mimicry Organisms", target: "Cyborg Ecosystem" },
            { source: "Cyborg Ecosystem", target: "Planetary Urbanism" },
            { source: "Cyborg Ecosystem", target: "Post-Human Society" },
            { source: "Cyborg Ecosystem", target: "Energy Flows" },
            { source: "Energy Flows", target: "Data Loops" },
            { source: "Data Loops", target: "Game Simulation" },
            { source: "Game Simulation", target: "Vertical Datascape Drawing" },
            { source: "Game Simulation", target: "Material Gesture Model" }
        ]
    };

    // Updated color scale for new design
    const colorScale = d3.scaleOrdinal()
        .domain(["Data Source", "Geographic Feature", "System Component", "System Layer", "Theme", "Dynamic Process", "Platform", "Output"])
        .range(["#8B7355", "#A67C52", "#7A6B47", "#6B5B42", "#5C4B37", "#9C8A70", "#B8A085", "#D4C4A8"]);

    // Create SVG
    const width = container.clientWidth;
    const height = 600;
    
    const svg = d3.select('#network-graph')
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Create a group for the graph
    const g = svg.append('g');

    // Create the simulation
    const simulation = d3.forceSimulation(graph.nodes)
        .force('link', d3.forceLink(graph.links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(60));

    // Create links
    const link = g.append('g')
        .selectAll('line')
        .data(graph.links)
        .join('line')
        .attr('class', 'link')
        .attr('stroke', 'rgba(44, 44, 44, 0.3)')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 1.5);

    // Create nodes
    const node = g.append('g')
        .selectAll('g')
        .data(graph.nodes)
        .join('g')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
        .attr('r', 20)
        .attr('fill', d => colorScale(d.type))
        .attr('stroke', '#2C2C2C')
        .attr('stroke-width', 1.5)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('stroke-width', 3);
            // Could add tooltip here
        })
        .on('mouseout', function(event, d) {
            d3.select(this).attr('stroke-width', 1.5);
        });

    // Add labels to nodes
    node.append('text')
        .text(d => {
            // Split long labels into multiple lines
            const words = d.id.split(' ');
            return words.length > 2 ? words.slice(0, 2).join(' ') + '\n' + words.slice(2).join(' ') : d.id;
        })
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('fill', '#2C2C2C')
        .attr('font-size', '8px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('pointer-events', 'none');

    // Add type labels to nodes
    node.append('text')
        .text(d => d.type)
        .attr('text-anchor', 'middle')
        .attr('dy', 30)
        .attr('fill', '#666')
        .attr('font-size', '6px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('opacity', 0.8)
        .attr('pointer-events', 'none');

    // Update positions on each tick
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Add legend
    const legend = d3.select('#network-graph')
        .append('div')
        .attr('class', 'legend');

    const legendItems = Array.from(new Set(graph.nodes.map(d => d.type)));
    
    legend.selectAll('.legend-item')
        .data(legendItems)
        .enter()
        .append('div')
        .attr('class', 'legend-item')
        .html(d => `
            <div class="legend-color" style="background-color: ${colorScale(d)}"></div>
            <span>${d}</span>
        `);

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        svg.attr('width', newWidth)
           .attr('viewBox', [0, 0, newWidth, height]);
        simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
        simulation.alpha(0.3).restart();
    });
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            previousSlide();
        } else {
            // Swipe left - go to next slide
            nextSlide();
        }
    }
}

// Initialize URL routing on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a hash in the URL and navigate to that slide
    const hash = window.location.hash.substring(1);
    if (hash) {
        const slideIndex = slideTitles.findIndex(title => title.toLowerCase() === hash.toLowerCase());
        if (slideIndex !== -1) {
            goToSlide(slideIndex);
        }
    }
    
    // Add smooth scroll to top when navigating
    document.querySelectorAll('.nav-btn, .section-dropdown').forEach(element => {
        element.addEventListener('click', smoothScrollToTop);
    });
});

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.deliverable, .field, .tool-category, .keyword');
    animatableElements.forEach(el => observer.observe(el));
});

// Preload next slide for better performance
function preloadSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides && slides[slideIndex]) {
        // Preload any images or heavy content in the next slide
        const images = slides[slideIndex].querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Performance optimization: preload adjacent slides
setInterval(() => {
    if (currentSlide > 0) preloadSlide(currentSlide - 1);
    if (currentSlide < totalSlides - 1) preloadSlide(currentSlide + 1);
}, 1000);

// ========================================
// CANVAS SIMULATION SYSTEM
// ========================================

let canvasSimulation = null;

function initializeCanvasSimulation() {
    // Only initialize if we're on the portal slide and canvas elements exist
    const terrainCanvas = document.getElementById('terrain');
    const pointCloudCanvas = document.getElementById('pointClouds');
    const particleCanvas = document.getElementById('particles');
    
    if (!terrainCanvas || !pointCloudCanvas || !particleCanvas) return;
    
    canvasSimulation = new CanvasSimulation(terrainCanvas, pointCloudCanvas, particleCanvas);
}

class CanvasSimulation {
    constructor(terrainCanvas, pointCloudCanvas, particleCanvas) {
        this.terrainCanvas = terrainCanvas;
        this.pointCloudCanvas = pointCloudCanvas;
        this.particleCanvas = particleCanvas;
        
        this.terrainCtx = terrainCanvas.getContext('2d');
        this.pointCtx = pointCloudCanvas.getContext('2d');
        this.particleCtx = particleCanvas.getContext('2d');
        
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.time = 0;
        this.fragmentsCollected = 0;
        this.droneCount = 3;
        this.isActive = true;
        
        this.resizeCanvases();
        this.initializeSystems();
        this.bindEvents();
        this.startAnimation();
        this.startDataUpdates();
    }
    
    resizeCanvases() {
        [this.terrainCanvas, this.pointCloudCanvas, this.particleCanvas].forEach(canvas => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    initializeSystems() {
        this.pointCloud = new PointCloud();
        this.terrain = new TerrainSystem();
        this.particles = new ParticleSystem();
    }
    
    bindEvents() {
        // Mouse interaction
        document.addEventListener('mousemove', (e) => {
            if (currentSlide !== 0) return; // Only active on portal slide
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Update coordinates display
            const coordsEl = document.getElementById('coordinates');
            if (coordsEl) {
                coordsEl.textContent = `${Math.floor(this.mouseX / 10)}.${Math.floor(this.mouseY / 10)}°`;
            }
            
            // Add trail particles
            this.particles.addParticle(this.mouseX, this.mouseY, 'trail');
            
            // Create ripple effect occasionally
            if (Math.random() > 0.95) {
                this.createRipple(this.mouseX, this.mouseY);
            }
        });
        
        // Click interaction
        document.addEventListener('click', (e) => {
            if (currentSlide !== 0) return; // Only active on portal slide
            
            // Collect archive fragment
            if (Math.random() > 0.6) {
                this.fragmentsCollected++;
                const fragmentEl = document.getElementById('fragmentCount');
                if (fragmentEl) {
                    fragmentEl.textContent = this.fragmentsCollected;
                }
                this.createArchiveFragment(e.clientX, e.clientY);
                this.particles.addParticle(e.clientX, e.clientY, 'collect');
            }
            
            // Create ripple on click
            this.createRipple(e.clientX, e.clientY);
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvases();
            this.terrain.generateTerrain();
            this.pointCloud.generatePoints();
        });
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (document.body.contains(ripple)) {
                document.body.removeChild(ripple);
            }
        }, 2000);
    }
    
    createArchiveFragment(x, y) {
        const fragments = [
            'MEMORY.LOG: Children in synthetic gardens',
            'BIOME.DATA: Methane lake resonance patterns',
            'RITUAL.REC: Pre-migration coffee ceremonies',
            'SPECIES.DNA: Cyborg butterfly neural maps',
            'ECHO.FRAGMENT: Titan wind formations',
            'CULTURAL.SEED: Server-lichen communication',
            'ECOSYSTEM.GHOST: Post-human footprints',
            'DATA.ARCHIVE: Algorithmic forest growth',
            'SIGNAL.TRACE: Biomimetic drone memories'
        ];
        
        const fragment = document.createElement('div');
        fragment.className = 'archive-fragment';
        fragment.textContent = fragments[Math.floor(Math.random() * fragments.length)];
        fragment.style.left = x + 'px';
        fragment.style.top = y + 'px';
        document.body.appendChild(fragment);
        
        setTimeout(() => {
            if (document.body.contains(fragment)) {
                document.body.removeChild(fragment);
            }
        }, 3000);
    }
    
    startDataUpdates() {
        // Update planet names and environmental data
        const planets = ['TITAN', 'EUROPA', 'MARS', 'ENCELADUS'];
        let currentPlanet = 0;
        
        setInterval(() => {
            if (currentSlide !== 0) return;
            
            currentPlanet = (currentPlanet + 1) % planets.length;
            const planetEl = document.getElementById('planetName');
            if (planetEl) {
                planetEl.textContent = planets[currentPlanet];
            }
            
            // Update sync level
            const syncLevel = Math.floor(60 + Math.random() * 30);
            const syncEl = document.getElementById('syncLevel');
            if (syncEl) {
                syncEl.textContent = syncLevel + '%';
            }
            
            // Occasionally update drone count
            if (Math.random() > 0.8) {
                this.droneCount = Math.floor(Math.random() * 3) + 2;
                const droneEl = document.getElementById('droneCount');
                if (droneEl) {
                    droneEl.textContent = this.droneCount;
                }
            }
        }, 8000);
        
        // Ambient archive fragment generation
        setInterval(() => {
            if (currentSlide !== 0 || Math.random() < 0.7) return;
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            this.createArchiveFragment(x, y);
        }, 6000);
    }
    
    startAnimation() {
        const animate = () => {
            if (currentSlide === 0 && this.isActive) {
                this.time = Date.now();
                
                this.pointCloud.update();
                this.pointCloud.render(this.pointCtx);
                
                this.terrain.render(this.terrainCtx);
                
                this.particles.update();
                this.particles.render(this.particleCtx);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    pause() {
        this.isActive = false;
    }
    
    resume() {
        this.isActive = true;
    }
}

// Point cloud system
class PointCloud {
    constructor() {
        this.points = [];
        this.generatePoints();
    }
    
    generatePoints() {
        this.points = [];
        for (let i = 0; i < 600; i++) {
            this.points.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 200 - 100,
                originalZ: Math.random() * 200 - 100,
                size: Math.random() * 2.5 + 0.5,
                alpha: Math.random() * 0.7 + 0.3,
                color: Math.random() > 0.7 ? '#4ecdc4' : '#00ffaa',
                speed: Math.random() * 0.4 + 0.1
            });
        }
    }
    
    update() {
        this.points.forEach(point => {
            point.z = point.originalZ + Math.sin(canvasSimulation.time * 0.001 + point.x * 0.01) * 15;
            point.y += point.speed;
            
            if (point.y > window.innerHeight + 50) {
                point.y = -50;
                point.x = Math.random() * window.innerWidth;
            }
        });
    }
    
    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        this.points.forEach(point => {
            const perspective = 200 / (200 + point.z);
            const x = point.x * perspective;
            const y = point.y * perspective;
            const size = point.size * perspective;
            
            ctx.globalAlpha = point.alpha * perspective * 0.8;
            ctx.fillStyle = point.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = point.color;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Terrain system
class TerrainSystem {
    constructor() {
        this.nodes = [];
        this.generateTerrain();
    }
    
    generateTerrain() {
        this.nodes = [];
        for (let i = 0; i < 40; i++) {
            this.nodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                connections: [],
                pulsePhase: Math.random() * Math.PI * 2,
                type: Math.random() > 0.8 ? 'archive' : 'node'
            });
        }
        
        // Create connections
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((other, j) => {
                if (i !== j) {
                    const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
                    if (dist < 180 && Math.random() > 0.75) {
                        node.connections.push(j);
                    }
                }
            });
        });
    }
    
    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Draw connections
        this.nodes.forEach((node, i) => {
            node.connections.forEach(connectionIndex => {
                const other = this.nodes[connectionIndex];
                const alpha = 0.15 + Math.sin(canvasSimulation.time * 0.002 + node.pulsePhase) * 0.08;
                
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = '#00ffaa';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            });
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const pulse = 0.4 + Math.sin(canvasSimulation.time * 0.003 + node.pulsePhase) * 0.25;
            const size = node.type === 'archive' ? 6 : 3;
            const color = node.type === 'archive' ? '#4ecdc4' : '#00ffaa';
            
            ctx.globalAlpha = pulse;
            ctx.fillStyle = color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = color;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Particle system
class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    addParticle(x, y, type = 'trail') {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 1.0,
            decay: type === 'trail' ? 0.025 : 0.015,
            size: type === 'trail' ? 1.5 : 3,
            color: type === 'trail' ? '#00ffaa' : '#4ecdc4',
            type: type
        });
    }
    
    update() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }
    
    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        this.particles.forEach(particle => {
            ctx.globalAlpha = particle.life * 0.7;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = particle.color;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Pause/resume simulation based on current slide
function updateSimulationState() {
    if (canvasSimulation) {
        if (currentSlide === 0) {
            canvasSimulation.resume();
        } else {
            canvasSimulation.pause();
        }
    }
}

// Integrate simulation state update into existing goToSlide function