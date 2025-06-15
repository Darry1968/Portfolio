document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalPrompt = document.getElementById('terminal-prompt').textContent;
    const lastLoginTimeEl = document.getElementById('last-login-time');

    if (lastLoginTimeEl) {
        lastLoginTimeEl.textContent = new Date().toLocaleString();
    }

    const availableSections = {
        'about': '#about',
        'skills': '#skills',
        'exploits': '#projects',
        'contact': '#contact',
        'home': '#home'
    };

    const commands = {
        'help': () => {
            appendOutput("Available commands:", "command-output");
            appendOutput("  help                - Show this help message", "command-output");
            appendOutput("  whoami                - Brief intro about me", "command-output");
            appendOutput("  ls | dir            - List navigable sections", "command-output");
            appendOutput("  cat | open | cd   - Navigate to a section (e.g., 'cat about')", "command-output");
            appendOutput("  date                - Display current date and time", "command-output");
            appendOutput("  echo [text]         - Display text", "command-output");
            appendOutput("  clear | cls         - Clear the terminal screen", "command-output");
            appendOutput("  resume              - Open my resume", "command-output");
            appendOutput("  socials             - Show social media links", "command-output");
        },
        'ls': listSections,
        'dir': listSections,
        'cat': navigateToSection,
        'open': navigateToSection,
        'cd': navigateToSection,
        'date': () => {
            appendOutput(new Date().toLocaleString(), "command-output");
        },
        'echo': (args) => {
            appendOutput(args.join(' '), "command-output");
        },
        'clear': clearTerminal,
        'cls': clearTerminal,
        'whoami': () => {
            appendOutput("Hello, Friend", "command-output");
            appendOutput("How do we know if we're in control?", "command-output");
            appendOutput("Well, my name is Darshan.", "command-output");
            appendOutput("I'm a security researcher, CTF player, and Security Program manager.", "command-output");
        },
        'resume': () => {
            appendOutput("Accessing secure file: Resume.pdf...", "command-output");
            window.open('Resume.pdf', '_blank');
            appendOutput("File should have opened in a new tab.", "command-output");
        },
        'socials': () => {
            appendOutput("Find me on:", "command-output");
            appendOutput("  LinkedIn: <a href='https://www.linkedin.com/in/darshan-soni-0759a722a/' target='_blank'>linkedin.com/in/darshan-soni-0759a722a/</a>", "command-output");
            appendOutput("  GitHub:   <a href='https://github.com/Darry1968' target='_blank'>github.com/Darry1968</a>", "command-output");
            appendOutput("  Blog:     <a href='https://blog.na5hv4r.me/' target='_blank'>blog.na5hv4r.me</a>", "command-output");
        }
    };

    function listSections() {
        appendOutput("Available sections:", "command-output");
        Object.keys(availableSections).forEach(section => {
            appendOutput(`  ${section}`, "command-output");
        });
    }

    function navigateToSection(args) {
        const sectionName = args[0]?.toLowerCase();
        if (sectionName && availableSections[sectionName]) {
            appendOutput(`Navigating to ${sectionName}...`, "command-output");
            // Smooth scroll to section
            const targetElement = document.querySelector(availableSections[sectionName]);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                appendOutput(`Error: Section element '${availableSections[sectionName]}' not found.`, "error-output");
            }
        } else if (sectionName) {
            appendOutput(`Error: Section '${sectionName}' not found. Type 'ls' to see available sections.`, "error-output");
        } else {
            appendOutput(`Usage: cat|open|goto [section_name]`, "error-output");
        }
    }

    function clearTerminal() {
        // Preserve initial welcome messages or clear completely
        const initialMessages = Array.from(terminalOutput.children).slice(0, 4); // Keep first 4 lines
        terminalOutput.innerHTML = '';
        initialMessages.forEach(msg => terminalOutput.appendChild(msg.cloneNode(true)));
        appendOutput("Terminal cleared. Type 'help' for commands.", "command-output");
    }

    function appendOutput(message, type = '') {
        const newLine = document.createElement('div');
        if (type === 'command-output' || type === 'error-output') {
            newLine.innerHTML = message; // Use innerHTML to render links for socials command
        } else {
            newLine.textContent = message;
        }
        if (type) {
            newLine.classList.add(type);
        }
        terminalOutput.appendChild(newLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
    }

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const fullCommand = terminalInput.value.trim();
            appendOutput(`${terminalPrompt}${fullCommand}`); // Echo command

            const [command, ...args] = fullCommand.split(/\s+/);
            terminalInput.value = ''; // Clear input

            if (command && commands[command.toLowerCase()]) {
                commands[command.toLowerCase()](args);
            } else if (command) {
                appendOutput(`fsociety_OS: command not found: ${command}. Type 'help'.`, "error-output");
            }
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Focus on input when terminal is clicked (if not already focused on input)
    const terminalElement = document.getElementById('terminal');
    if (terminalElement) {
        terminalElement.addEventListener('click', (event) => {
            if (event.target !== terminalInput) {
                terminalInput.focus();
            }
        });
    }
});
