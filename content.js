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
        // Create a red overlay for detected NSFW images
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = img.offsetTop + 'px';
        overlay.style.left = img.offsetLeft + 'px';
        overlay.style.width = img.offsetWidth + 'px';
        overlay.style.height = img.offsetHeight + 'px';
        overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Red with transparency for NSFW
        overlay.style.zIndex = '9999'; // Ensure it's on top
        document.body.appendChild(overlay);
        
        // Log image details to the console
        console.log(`Detected NSFW Image: ${img.src}`);
    } else {
        console.log(`Safe Image: ${img.src}`); // Log safe images
    }
}

// If no NSFW images were detected, log a message and show a safe content overlay after a delay
if (detectedImages.length === 0) {
    console.log("No NSFW images detected.");
    
    // Set a timeout to show the safe content overlay after 3 seconds
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
        safeOverlay.innerText = 'Content is Safe'; // Message to display
        
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

        document.body.appendChild(safeOverlay);
    }, 3000); // 3000 milliseconds = 3 seconds
}