// Terminal Matrix Animation Script
document.addEventListener('DOMContentLoaded', function () {
    // Create the terminal animation container
    const terminalAnimation = document.createElement('div');
    terminalAnimation.className = 'terminal-animation';
    document.body.appendChild(terminalAnimation);

    // Set up the characters to use
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:<>?[];\'"\\,./-=`~';

    // Number of columns depends on screen width
    const columns = Math.floor(window.innerWidth / 20);

    // Create and append the falling characters
    for (let i = 0; i < columns; i++) {
        const duration = Math.random() * 3 + 2; // Random duration between 2-5s
        const delay = Math.random() * 2; // Random start delay

        const codeElement = document.createElement('div');
        codeElement.className = 'terminal-code';
        codeElement.style.left = i * 20 + 'px';
        codeElement.style.animationDuration = duration + 's';
        codeElement.style.animationDelay = delay + 's';

        // Generate random string of characters
        let text = '';
        const stringLength = Math.floor(Math.random() * 15) + 5; // Random length between 5-20 characters

        for (let j = 0; j < stringLength; j++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        codeElement.textContent = text;
        terminalAnimation.appendChild(codeElement);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        // Clear existing animation
        terminalAnimation.innerHTML = '';

        // Recalculate columns based on new width
        const newColumns = Math.floor(window.innerWidth / 20);

        // Recreate the animation with the new number of columns
        for (let i = 0; i < newColumns; i++) {
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            const codeElement = document.createElement('div');
            codeElement.className = 'terminal-code';
            codeElement.style.left = i * 20 + 'px';
            codeElement.style.animationDuration = duration + 's';
            codeElement.style.animationDelay = delay + 's';

            let text = '';
            const stringLength = Math.floor(Math.random() * 15) + 5;

            for (let j = 0; j < stringLength; j++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            codeElement.textContent = text;
            terminalAnimation.appendChild(codeElement);
        }
    });

    // Add cyber security terms that occasionally appear in the animation
    const securityTerms = [
        'VULNERABILITY',
        'ENCRYPTION',
        'FIREWALL',
        'MALWARE',
        'EXPLOIT',
        'PAYLOAD',
        'BACKDOOR',
        'ZERO-DAY',
        'RANSOMWARE',
        'PHISHING',
        'XSS',
        'SQL INJECTION',
        'DDOS',
        'BOTNET',
        'CTF{FLAG}'
    ];

    // Function to randomly insert security terms
    function insertSecurityTerm() {
        const term = securityTerms[Math.floor(Math.random() * securityTerms.length)];
        const termElement = document.createElement('div');
        termElement.className = 'terminal-code';
        termElement.style.left = Math.random() * window.innerWidth + 'px';
        termElement.style.animationDuration = '4s';
        termElement.style.color = '#ff003c';
        termElement.style.fontWeight = 'bold';
        termElement.style.fontSize = '18px';
        termElement.textContent = term;
        terminalAnimation.appendChild(termElement);

        // Remove the term element after animation completes
        setTimeout(() => {
            termElement.remove();
        }, 4000);
    }

    // Insert security terms at random intervals
    setInterval(insertSecurityTerm, 3000);
});