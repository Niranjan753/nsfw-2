// ... existing code ...
const explicitKeywords = [
    "explicit", 
    "nsfw", 
    "adult", 
    "18+", 
    "porn", 
    "hot",
    "sex", 
    "nude", 
    "xxx", 
    "erotic", 
    "fetish", 
    "strip", 
    "swinger", 
    "hookup", 
    "escort", 
    "cheating", 
    "kinky"
];

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

// If no NSFW images were detected, log a message and show a safe content overlay after a delay
if (detectedImages.length === 0 && !isExplicitText(bodyText)) {
    console.log("No NSFW images detected.");
    
    // Set a timeout to show the safe content overlay after 3 seconds
    /*
    setTimeout(() => {
        // Create a green overlay indicating safe content
        const safeOverlay = document.createElement('div');
        safeOverlay.style.position = 'fixed';
        safeOverlay.style.top = '0';
        safeOverlay.style.left = '0';
        safeOverlay.style.width = '100%';
        safeOverlay.style.height = '100%';
        safeOverlay.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Green with transparency
        safeOverlay.style.zIndex = '9999'; // Ensure it's on top
        safeOverlay.style.display = 'flex';
        safeOverlay.style.alignItems = 'center';
        safeOverlay.style.justifyContent = 'center';
        safeOverlay.style.fontSize = '24px';
        safeOverlay.style.color = 'white';
        safeOverlay.style.innerText = 'Content is Safe'; // Message to display
        document.body.appendChild(safeOverlay);
        
        // Create a "Done" button
        const doneButton = document.createElement('button');
        doneButton.innerText = 'Done';
        doneButton.style.marginTop = '20px';
        doneButton.style.padding = '10px 20px';
        doneButton.style.fontSize = '16px';
        doneButton.style.color = 'white';
        doneButton.style.backgroundColor = '#007BFF'; // Blue color
        doneButton.style.border = 'none';
        doneButton.style.borderRadius = '5px';
        doneButton.style.cursor = 'pointer';
        doneButton.style.zIndex = '10000'; // Ensure it's on top of the overlay
        safeOverlay.appendChild(doneButton);
        
        // Add click event to the "Done" button
        doneButton.addEventListener('click', () => {
            document.body.removeChild(safeOverlay); // Remove the overlay
        });
    }, 3000); // 3000 milliseconds = 3 seconds
    */
}

function logImages() {
    const images = document.querySelectorAll('img'); // Select all images on the page
    images.forEach((img) => {
        console.log(img.src); // Log the image source to the console
    });
}

// Call logImages every 3 seconds
setInterval(logImages, 3000);