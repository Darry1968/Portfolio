// Cyber Glitch Effect for Logo
document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    // Store the original text
    const originalText = logo.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    // Function to create a glitch effect
    function glitch() {
        // Only run the effect sometimes
        if (Math.random() < 0.1) {
            let glitchText = '';
            let glitchPositions = [];

            // Determine how many characters to glitch (1-3)
            const glitchCount = Math.floor(Math.random() * 3) + 1;

            // Select random positions to glitch
            for (let i = 0; i < glitchCount; i++) {
                const position = Math.floor(Math.random() * originalText.length);
                if (!glitchPositions.includes(position)) {
                    glitchPositions.push(position);
                }
            }

            // Create the glitched text
            for (let i = 0; i < originalText.length; i++) {
                if (glitchPositions.includes(i)) {
                    glitchText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                } else {
                    glitchText += originalText.charAt(i);
                }
            }

            // Apply the glitched text
            logo.textContent = glitchText;

            // Reset after a short delay
            setTimeout(() => {
                logo.textContent = originalText;
            }, 100);
        }
    }

    // Apply glitch effect at random intervals
    setInterval(glitch, 500);

    // Add hover effect to intensify glitching
    logo.addEventListener('mouseenter', function () {
        // Store the normal interval so we can clear it
        const intensiveGlitch = setInterval(() => {
            let glitchText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.3) { // 30% chance to glitch each character
                    glitchText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                } else {
                    glitchText += originalText.charAt(i);
                }
            }
            logo.textContent = glitchText;
        }, 50);

        // Store the intensive glitch interval on the element
        logo.dataset.glitchInterval = intensiveGlitch;
    });

    // Reset on mouse leave
    logo.addEventListener('mouseleave', function () {
        // Clear the intensive glitch interval
        clearInterval(logo.dataset.glitchInterval);
        logo.textContent = originalText;
    });
});