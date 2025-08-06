document.addEventListener('DOMContentLoaded', function() {
    // Check if images are loading
    const images = document.querySelectorAll('.blockhood-slider img');
    console.log('Found', images.length, 'images in the slider');
    
    images.forEach((img, index) => {
        // Log image source and status
        console.log(`Image ${index + 1}:`, img.src);
        
        // Check if image loads successfully
        img.onload = function() {
            console.log(`✓ Image ${index + 1} loaded successfully`);
        };
        
        // Check for image load errors
        img.onerror = function() {
            console.error(`✗ Error loading image ${index + 1}:`, img.src);
        };
        
        // Force check status after a short delay
        setTimeout(() => {
            if (!img.complete) {
                console.warn(`? Image ${index + 1} is still loading:`, img.src);
            } else if (img.naturalWidth === 0) {
                console.error(`✗ Image ${index + 1} failed to load:`, img.src);
            }
        }, 1000);
    });
});
