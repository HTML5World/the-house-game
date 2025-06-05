// JavaScript for FutureFace.ai

document.addEventListener('DOMContentLoaded', () => {
    console.log("FutureFace.ai script loaded.");

    // --- DOM Element References ---
    const parent1Upload = document.getElementById('parent1-upload');
    const parent2Upload = document.getElementById('parent2-upload');
    const parent1Preview = document.getElementById('parent1-preview');
    const parent2Preview = document.getElementById('parent2-preview');
    const generateButton = document.getElementById('generate-button');
    const uploadError = document.getElementById('upload-error');
    const styleRadios = document.querySelectorAll('input[name="style"]');
    const resultImageContainer = document.getElementById('result-image-container');
    const processingMessage = document.getElementById('processing-message');

    // Store uploaded file data
    let parent1File = null;
    let parent2File = null;

    // --- Image Upload and Preview ---
    function handleFileUpload(event, previewElement, fileStorage) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.innerHTML = `<img src="${e.target.result}" alt="Selected image preview">`;
            };
            reader.readAsDataURL(file);
            if (fileStorage === 'parent1') parent1File = file;
            if (fileStorage === 'parent2') parent2File = file;
        } else {
            previewElement.innerHTML = ''; // Clear preview if no file selected
            if (fileStorage === 'parent1') parent1File = null;
            if (fileStorage === 'parent2') parent2File = null;
        }
        checkEnableGenerateButton();
    }

    parent1Upload.addEventListener('change', (e) => handleFileUpload(e, parent1Preview, 'parent1'));
    parent2Upload.addEventListener('change', (e) => handleFileUpload(e, parent2Preview, 'parent2'));

    function checkEnableGenerateButton() {
        if (parent1File && parent2File) {
            generateButton.disabled = false;
            uploadError.style.display = 'none';
        } else {
            generateButton.disabled = true;
        }
    }

    // --- Generate Button Functionality ---
    generateButton.addEventListener('click', () => {
        if (!parent1File || !parent2File) {
            uploadError.textContent = 'Please select two images before generating.';
            uploadError.style.display = 'block';
            return;
        }
        uploadError.style.display = 'none';
        resultImageContainer.innerHTML = ''; // Clear previous results
        processingMessage.style.display = 'block';

        const selectedStyle = document.querySelector('input[name="style"]:checked').value;

        // Simulate AI processing delay
        setTimeout(() => {
            processingMessage.style.display = 'none';
            const resultImg = document.createElement('img');
            // Placeholder images - these paths would point to actual generated or sample images
            // For now, using generic placeholders or assuming they exist in an /images folder.
            // A real implementation would fetch these from a server or generate them.
            let imageName = 'baby_placeholder.jpg'; // Default placeholder
            switch (selectedStyle) {
                case 'realistic':
                    imageName = 'baby_realistic.jpg';
                    break;
                case 'funny':
                    imageName = 'baby_funny.jpg';
                    break;
                case 'anime':
                    imageName = 'baby_anime.jpg';
                    break;
                case 'meme':
                    imageName = 'baby_meme.jpg';
                    break;
            }
            // To avoid broken images if they don't exist, we can use a generic service or skip loading for now
            // For this example, we'll set a placeholder style.
            // In a real app, resultImg.src would point to an actual image URL.
            const placeholderDiv = document.createElement('div');
            placeholderDiv.classList.add('image-placeholder'); // Reuse existing CSS class
            placeholderDiv.textContent = `Generated '${selectedStyle}' style baby image would appear here.`;
            placeholderDiv.style.width = '300px'; // Adjust size as needed
            placeholderDiv.style.height = '300px';
            placeholderDiv.style.lineHeight = '300px'; // Center text vertically
            placeholderDiv.style.margin = '0 auto'; // Center block

            resultImageContainer.appendChild(placeholderDiv);

        }, 2500); // 2.5 seconds delay
    });

    // --- Stories Section Gallery/Slideshow ---
    const storyItems = document.querySelectorAll('.story-item');
    const nextStoryButton = document.getElementById('next-story');
    const prevStoryButton = document.getElementById('prev-story');
    let currentStoryIndex = 0;

    function showStory(index) {
        storyItems.forEach((item, i) => {
            item.classList.remove('active-story');
            if (i === index) {
                item.classList.add('active-story');
            }
        });
        // Update button states
        prevStoryButton.disabled = index === 0;
        nextStoryButton.disabled = index === storyItems.length - 1;
    }

    if (storyItems.length > 0) {
        showStory(currentStoryIndex); // Show the first story initially

        nextStoryButton.addEventListener('click', () => {
            if (currentStoryIndex < storyItems.length - 1) {
                currentStoryIndex++;
                showStory(currentStoryIndex);
            }
        });

        prevStoryButton.addEventListener('click', () => {
            if (currentStoryIndex > 0) {
                currentStoryIndex--;
                showStory(currentStoryIndex);
            }
        });
    } else {
        // Hide buttons if no stories
        if(nextStoryButton) nextStoryButton.style.display = 'none';
        if(prevStoryButton) prevStoryButton.style.display = 'none';
    }

    // --- Pricing Section Button Handlers ---
    const buyBabyPackButton = document.getElementById('buy-baby-pack');
    const buyFutureTimelineButton = document.getElementById('buy-future-timeline');
    const purchaseConfirmationDiv = document.getElementById('purchase-confirmation');

    function showPurchaseConfirmation(packageName) {
        purchaseConfirmationDiv.textContent = `Thank you for choosing the ${packageName}! Your purchase is confirmed. Payment gateway integration would happen here.`;
        purchaseConfirmationDiv.style.display = 'block';

        // Optional: Hide the message after a few seconds
        setTimeout(() => {
            purchaseConfirmationDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }

    if (buyBabyPackButton) {
        buyBabyPackButton.addEventListener('click', () => {
            showPurchaseConfirmation('Baby Pack');
        });
    }

    if (buyFutureTimelineButton) {
        buyFutureTimelineButton.addEventListener('click', () => {
            showPurchaseConfirmation('Future Timeline');
        });
    }
});
