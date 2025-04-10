// Typing Effect for Security Researcher Role
document.addEventListener('DOMContentLoaded', function () {
    const roles = [
        "Security Researcher",
        "CTF Player",
        "Penetration Tester",
        "Security Program Manager"
    ];

    const roleSpan = document.querySelector('.home .home-content .text-3 span');
    if (!roleSpan) return;

    let currentRole = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;

    function type() {
        const fullText = roles[currentRole];

        if (isDeleting) {
            // Remove a character
            text = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            text = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Update the text
        roleSpan.textContent = text;

        // Typing speed
        let typeSpeed = isDeleting ? 80 : 150; // Faster when deleting

        // If reached end of word when typing
        if (!isDeleting && text === fullText) {
            // Pause at the end
            typeSpeed = 2000;
            isDeleting = true;
        }
        // If deleted everything
        else if (isDeleting && text === '') {
            isDeleting = false;
            // Move to next role
            currentRole = (currentRole + 1) % roles.length;
            // Pause before typing next word
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing effect
    setTimeout(type, 1000);
});