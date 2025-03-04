const explicitKeywords = ["explicit", "nsfw", "adult"]; // Add more keywords as needed

function isExplicitImage(src) {
    return explicitKeywords.some(keyword => src.includes(keyword));
}

const images = document.getElementsByTagName('img');
let detectedImages = [];

// If no images are found, simulate detection
if (images.length === 0) {
    console.log("No images found on the page. Simulating detection...");
    // Create dummy images for simulation
    for (let i = 0; i < 3; i++) {
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/150?text=NSFW+Image+${i + 1}`; // Dummy image
        img.style.display = 'block'; // Make sure it's visible
        document.body.appendChild(img);
        images.push(img); // Add to images array for processing
    }
}

// Process all images and log their details
for (let img of images) {
    console.log(`Processing Image: ${img.src}`); // Log all images being processed
    if (isExplicitImage(img.src)) {
        detectedImages.push(img);
        // Create a green overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = img.offsetTop + 'px';
        overlay.style.left = img.offsetLeft + 'px';
        overlay.style.width = img.offsetWidth + 'px';
        overlay.style.height = img.offsetHeight + 'px';
        overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Green with transparency
        overlay.style.zIndex = '9999'; // Ensure it's on top
        document.body.appendChild(overlay);
        
        // Log image details to the console
        console.log(`Detected NSFW Image: ${img.src}`);
    } else {
        console.log(`Safe Image: ${img.src}`); // Log safe images
    }
}

// If no NSFW images were detected, log a message
if (detectedImages.length === 0) {
    console.log("No NSFW images detected.");
}