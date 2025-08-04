class ArchitecturalVisualization {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.steps = [];
        this.currentStep = 0;
        this.totalSteps = 15;
        this.stepsPerScroll = 3;
        this.isAnimating = false;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        // Create Three.js scene with fog
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a1a);
        this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.05);
        
        // Camera setup with smooth movement
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 15);
        this.cameraTarget = new THREE.Vector3(0, 0, 0);
        
        // Renderer setup with better quality
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Add environment
        this.addLights();
        this.createEnvironment();
        this.createSteps();
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        
        // Start animation loop
        this.animate();
    }
    
    addLights() {
        // Ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Main directional light (sun)
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.position.set(10, 20, 10);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 50;
        this.sunLight.shadow.camera.left = -20;
        this.sunLight.shadow.camera.right = 20;
        this.sunLight.shadow.camera.top = 20;
        this.sunLight.shadow.camera.bottom = -20;
        this.scene.add(this.sunLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x00a8ff, 0.3);
        fillLight.position.set(-10, 10, -10);
        this.scene.add(fillLight);
    }
    
    createEnvironment() {
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a2a,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Add a subtle grid helper
        const gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
        gridHelper.position.y = -1.99;
        this.scene.add(gridHelper);
    }
    
    createSteps() {
        // Create a group to hold all steps
        this.stepsGroup = new THREE.Group();
        this.scene.add(this.stepsGroup);
        
        // Create 15 steps in a spiral formation
        const stepGeometry = new THREE.BoxGeometry(4, 0.2, 8);
        const stepMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffaa,
            roughness: 0.3,
            metalness: 0.5,
            emissive: 0x003322,
            emissiveIntensity: 0.1
        });
        
        // Create edge highlights
        const edges = new THREE.EdgesGeometry(stepGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00ffcc, 
            linewidth: 2,
            transparent: true,
            opacity: 0.5
        });
        
        for (let i = 0; i < this.totalSteps; i++) {
            // Create step mesh
            const step = new THREE.Mesh(stepGeometry, stepMaterial.clone());
            step.castShadow = true;
            step.receiveShadow = true;
            
            // Add edge highlights
            const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
            step.add(edgesMesh);
            
            // Position steps in an ascending spiral
            const angle = (i / this.totalSteps) * Math.PI * 2 * 1.5;
            const radius = 5 + (i * 0.8);
            const height = i * 0.8;
            
            step.position.x = Math.cos(angle) * radius;
            step.position.y = height;
            step.position.z = Math.sin(angle) * radius;
            
            // Rotate steps to face outward
            step.lookAt(0, height, 0);
            
            // Store step data
            this.steps.push({
                mesh: step,
                targetY: step.position.y,
                position: step.position.clone(),
                rotation: step.rotation.clone(),
                active: false
            });
            
            this.stepsGroup.add(step);
        }
        
        // Position camera to look at first step
        this.updateCameraTarget(0);
    }
    
    updateStep(stepIndex) {
        // Update which steps are active based on current position
        this.steps.forEach((step, i) => {
            const isActive = i === stepIndex;
            const isNext = i > stepIndex && i <= stepIndex + this.stepsPerScroll;
            const isPassed = i < stepIndex;
            
            // Animate step based on state
            if (isActive) {
                step.mesh.material.opacity = 1;
                step.mesh.material.emissiveIntensity = 0.5;
                step.mesh.scale.set(1.1, 1.1, 1.1);
            } else if (isNext) {
                step.mesh.material.opacity = 0.7;
                step.mesh.material.emissiveIntensity = 0.2;
                step.mesh.scale.set(0.9, 0.9, 0.9);
            } else if (isPassed) {
                step.mesh.material.opacity = 0.4;
                step.mesh.material.emissiveIntensity = 0;
                step.mesh.scale.set(0.8, 0.8, 0.8);
            } else {
                step.mesh.material.opacity = 0.1;
                step.mesh.material.emissiveIntensity = 0;
                step.mesh.scale.set(0.6, 0.6, 0.6);
            }
            
            // Add subtle floating animation to active and next steps
            if (isActive || isNext) {
                const time = this.clock.getElapsedTime();
                step.mesh.position.y = step.targetY + Math.sin(time * 2 + i) * 0.05;
            }
        });
    }
    
    // Update step progress for smooth transitions between steps
    updateStepProgress(baseStepIndex, progress) {
        const nextStepIndex = Math.min(baseStepIndex + this.stepsPerScroll, this.steps.length - 1);
        
        this.steps.forEach((step, i) => {
            if (i >= baseStepIndex && i <= nextStepIndex) {
                // Current step group - interpolate between states
                const stepProgress = (i - baseStepIndex) / (nextStepIndex - baseStepIndex);
                const targetProgress = Math.max(0, Math.min(1, (progress - stepProgress) * (nextStepIndex - baseStepIndex)));
                
                step.mesh.material.opacity = 0.7 + (0.3 * targetProgress);
                step.mesh.material.emissiveIntensity = 0.2 + (0.3 * targetProgress);
                const scale = 0.9 + (0.2 * targetProgress);
                step.mesh.scale.set(scale, scale, scale);
                
                // Add floating animation
                const time = this.clock.getElapsedTime();
                step.mesh.position.y = step.targetY + Math.sin(time * 2 + i) * 0.05 * targetProgress;
            } else if (i < baseStepIndex) {
                // Passed steps
                step.mesh.material.opacity = 0.4;
                step.mesh.material.emissiveIntensity = 0;
                step.mesh.scale.set(0.8, 0.8, 0.8);
            } else {
                // Upcoming steps
                step.mesh.material.opacity = 0.1;
                step.mesh.material.emissiveIntensity = 0;
                step.mesh.scale.set(0.6, 0.6, 0.6);
            }
        });
        
        // Update camera position based on progress
        const cameraZ = 15 - (baseStepIndex * 0.3) - (progress * 0.3 * this.stepsPerScroll);
        const cameraY = 2 + (baseStepIndex * 0.1) + (progress * 0.1 * this.stepsPerScroll);
        
        this.camera.position.z = cameraZ;
        this.camera.position.y = cameraY;
        this.camera.lookAt(0, cameraY * 0.5, -10);
        
        return true;
    }
    
    updateCameraTarget(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            const targetStep = this.steps[stepIndex];
            this.cameraTarget.copy(targetStep.position);
            this.cameraTarget.y += 1; // Look slightly above the step
            
            // Calculate camera position based on current step
            const angle = (stepIndex / this.totalSteps) * Math.PI * 2 * 1.5;
            const radius = 10 + (stepIndex * 0.5);
            
            this.camera.position.x = Math.cos(angle) * radius;
            this.camera.position.z = Math.sin(angle) * radius;
            this.camera.position.y = 2 + (stepIndex * 0.3);
            
            // Update camera to look at target
            this.camera.lookAt(this.cameraTarget);
        }
    }
    
    scrollToStep(stepIndex) {
        if (this.isAnimating || stepIndex < 0 || stepIndex >= this.totalSteps) {
            return false;
        }
        
        this.currentStep = stepIndex;
        this.isAnimating = true;
        
        // Animate camera to new position
        this.updateCameraTarget(stepIndex);
        this.updateStep(stepIndex);
        
        // Reset animation flag after a short delay
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
        
        return true;
    }
    
    scrollNext() {
        const nextStep = Math.min(this.currentStep + this.stepsPerScroll, this.totalSteps - 1);
        return this.scrollToStep(nextStep);
    }
    
    scrollPrev() {
        const prevStep = Math.max(this.currentStep - this.stepsPerScroll, 0);
        return this.scrollToStep(prevStep);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();
        
        // Smooth camera movement
        this.camera.position.lerp(this.cameraTarget, delta * 2);
        
        // Rotate the entire steps group slowly
        this.stepsGroup.rotation.y = time * 0.05;
        
        // Update renderer
        this.renderer.render(this.scene, this.camera);
    }
}
