// content.js
const explicitKeywords = ["explicit", "nsfw", "adult", "18+", "porn"]; // Added new keywords

function isExplicitImage(src) {
    // Check if the image source contains any of the explicit keywords
    return explicitKeywords.some(keyword => src.toLowerCase().includes(keyword.toLowerCase()));
}

function isExplicitText(text) {
    // Check if the text content contains any of the explicit keywords
    return explicitKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
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
        console.log("Explicit content detected in image source"); // Log explicit content detection
        
        // Create a blur overlay for detected explicit images
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = img.offsetTop + 'px';
        overlay.style.left = img.offsetLeft + 'px';
        overlay.style.width = img.offsetWidth + 'px';
        overlay.style.height = img.offsetHeight + 'px';
        overlay.style.backdropFilter = 'blur(5px)'; // Blur effect
        overlay.style.zIndex = '9999'; // Ensure it's on top
        document.body.appendChild(overlay);
        
        // Log image details to the console
        console.log(`Detected NSFW Image: ${img.src}`);
    } else {
        console.log(`Safe Image: ${img.src}`); // Log safe images
    }
}

// Check the text content of the page for explicit keywords
const bodyText = document.body.innerText;
if (isExplicitText(bodyText)) {
    console.log("Explicit content detected in text"); // Log explicit content detection in text
    
    // Create a blur overlay for explicit content in text
    const textOverlay = document.createElement('div');
    textOverlay.style.position = 'fixed';
    textOverlay.style.top = '0';
    textOverlay.style.left = '0';
    textOverlay.style.width = '100%';
    textOverlay.style.height = '100%';
    textOverlay.style.backdropFilter = 'blur(5px)'; // Blur effect
    textOverlay.style.zIndex = '9999'; // Ensure it's on top
    textOverlay.style.display = 'flex';
    textOverlay.style.alignItems = 'center';
    textOverlay.style.justifyContent = 'center';
    textOverlay.style.fontSize = '24px';
    textOverlay.style.color = 'red'; // Red text color
    textOverlay.innerText = 'Explicit Content Detected'; // Message to display
    document.body.appendChild(textOverlay);
}

// If no NSFW images were detected, log a message
if (detectedImages.length === 0 && !isExplicitText(bodyText)) {
    console.log("No NSFW images detected.");
}