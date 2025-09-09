// Coptic Typing Test - Time-based Application Logic
class CopticTypingTest {
    constructor() {
        this.testDuration = 30; // Default 30 seconds
        this.startTime = null;
        this.endTime = null;
        this.isTestActive = false;
        this.isTestComplete = false;
        this.currentCharIndex = 0;
        this.errors = 0;
        this.totalChars = 0;
        this.currentText = '';
        this.timeRemaining = 30;
        this.totalCharsTyped = 0;
        this.totalErrors = 0;
        
        // User statistics
        this.userStats = this.loadUserStats();
        
        // DOM elements
        this.typingArea = document.getElementById('typing-area');
        this.textContent = document.getElementById('text-content');
        this.typingInput = document.getElementById('typing-input');
        this.resetBtn = document.getElementById('reset-btn');
        this.resultsModal = document.getElementById('results-modal');
        
        // Stats elements
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.timeElement = document.getElementById('time');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        
        // Header stats
        this.bestWpmElement = document.getElementById('best-wpm');
        
        this.initializeEventListeners();
        this.updateHeaderStats();
        this.initializeFileLoader();
        this.generateNewText();
        
        // Add resize listener for responsive behavior
        this.initializeResizeHandler();
        
        console.log('CopticTypingTest initialized');
    }
    
    initializeEventListeners() {
        // Duration selection
        document.querySelectorAll('input[name="duration"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.testDuration = parseInt(e.target.value);
                this.timeRemaining = this.testDuration;
                this.resetTest();
            });
        });
        
        // Control buttons
        this.resetBtn.addEventListener('click', () => this.resetTest());
        
        // Typing input
        this.typingInput.addEventListener('input', (e) => this.handleTyping(e));
        this.typingInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Modal buttons
        document.getElementById('try-again-btn').addEventListener('click', () => this.tryAgain());
        document.getElementById('new-challenge-btn').addEventListener('click', () => this.newChallenge());
        
        // Prevent context menu on text display
        this.textContent.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Add click handler to logo/title to reset
        const logoTitle = document.querySelector('.logo h1');
        if (logoTitle) {
            logoTitle.style.cursor = 'pointer';
            logoTitle.addEventListener('click', () => this.resetTest());
        }
        
        // Add click handler to Best WPM stat to show graph
        this.bestWpmElement.addEventListener('click', () => this.showWPMGraph());
        
        // Add close button handler for WPM graph modal
        document.getElementById('close-graph-btn').addEventListener('click', () => {
            document.getElementById('wpm-graph-modal').style.display = 'none';
        });
    }
    
    initializeResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Regenerate lines based on new screen size
                if (this.sourceLines && this.sourceLines.length > 0) {
                    this.generateDynamicLines();
                    this.setupTextDisplay();
                }
            }, 300);
        });
    }
    
    async initializeFileLoader() {
        console.log('Loading Coptic text data...');
        const success = await copticFileLoader.loadCopticText();
        if (success) {
            console.log('Coptic text data loaded successfully');
            this.generateNewText();
        } else {
            console.warn('Failed to load Coptic text data, using fallback');
        }
    }
    
    generateNewText() {
        // Generate text lines for scrolling display
        const availableLines = copticFileLoader.copticLines || ['ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲡⲉⲛⲥⲱⲧⲏⲣ'];
        
        // Generate enough source text for the test duration
        const estimatedLinesNeeded = Math.ceil(this.testDuration / 8);
        this.sourceLines = [];
        
        for (let i = 0; i < Math.max(estimatedLinesNeeded, 20); i++) {
            const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
            this.sourceLines.push(randomLine);
        }
        
        // Generate dynamic lines based on screen size
        this.generateDynamicLines();
        
        this.currentLineIndex = 0;
        this.currentLineCharIndex = 0;
        this.setupTextDisplay();
    }
    
    generateDynamicLines() {
        // Calculate optimal words per line based on screen size
        const containerWidth = this.textContent.offsetWidth || 800;
        const avgCharWidth = 20; // Approximate width for Coptic characters
        const wordsPerLine = Math.max(3, Math.floor(containerWidth / (avgCharWidth * 8))); // ~8 chars per word average
        
        this.textLines = [];
        let currentLine = '';
        let wordCount = 0;
        
        // Process all source lines
        for (const sourceLine of this.sourceLines) {
            const words = sourceLine.split(' ');
            
            for (const word of words) {
                if (wordCount === 0) {
                    currentLine = word;
                    wordCount = 1;
                } else if (wordCount < wordsPerLine) {
                    currentLine += ' ' + word;
                    wordCount++;
                } else {
                    // Line is full, save it and start new line
                    this.textLines.push(currentLine);
                    currentLine = word;
                    wordCount = 1;
                }
            }
            
            // If we have words in current line, save it
            if (currentLine.trim()) {
                this.textLines.push(currentLine);
                currentLine = '';
                wordCount = 0;
            }
        }
        
        // Ensure we have enough lines
        if (this.textLines.length < 10) {
            this.generateMoreDynamicLines();
        }
    }
    
    generateMoreDynamicLines() {
        const availableLines = copticFileLoader.copticLines || ['ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲡⲉⲛⲥⲱⲧⲏⲣ'];
        const containerWidth = this.textContent.offsetWidth || 800;
        const avgCharWidth = 20;
        const wordsPerLine = Math.max(3, Math.floor(containerWidth / (avgCharWidth * 8)));
        
        let currentLine = '';
        let wordCount = 0;
        
        for (let i = 0; i < 10; i++) {
            const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
            const words = randomLine.split(' ');
            
            for (const word of words) {
                if (wordCount === 0) {
                    currentLine = word;
                    wordCount = 1;
                } else if (wordCount < wordsPerLine) {
                    currentLine += ' ' + word;
                    wordCount++;
                } else {
                    this.textLines.push(currentLine);
                    currentLine = word;
                    wordCount = 1;
                }
            }
            
            if (currentLine.trim()) {
                this.textLines.push(currentLine);
                currentLine = '';
                wordCount = 0;
            }
        }
    }
    
    setupTextDisplay() {
        this.textContent.innerHTML = '';
        
        // Always show exactly 2 lines
        const linesToShow = this.textLines.slice(this.currentLineIndex, this.currentLineIndex + 2);
        
        // Ensure we have at least 2 lines to show
        while (linesToShow.length < 2 && this.currentLineIndex + linesToShow.length < this.textLines.length) {
            linesToShow.push(this.textLines[this.currentLineIndex + linesToShow.length]);
        }
        
        // If we still don't have enough lines, generate more
        if (linesToShow.length < 2) {
            this.generateMoreDynamicLines();
            const additionalLines = this.textLines.slice(this.currentLineIndex + linesToShow.length, this.currentLineIndex + 2);
            linesToShow.push(...additionalLines);
        }
        
        // Create line containers
        linesToShow.forEach((lineText, lineIndex) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'text-line';
            
            // First line is active (where user types), second line is preview
            if (lineIndex === 0) {
                lineDiv.classList.add('active-line');
            } else {
                lineDiv.classList.add('preview-line');
            }
            
            lineDiv.dataset.lineIndex = this.currentLineIndex + lineIndex;
            
            // Create character spans for this line, preserving combining characters
            const chars = this.splitTextPreservingCombining(lineText + ' '); // Simply add space to the end
            chars.forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char';
                span.dataset.lineIndex = this.currentLineIndex + lineIndex;
                span.dataset.charIndex = i;
                lineDiv.appendChild(span);
            });
            
            this.textContent.appendChild(lineDiv);
        });
        
        // Set current character
        this.updateCurrentChar();
        this.currentCharIndex = 0;
        this.errors = 0;
    }
    
    updateCurrentChar() {
        // Remove all current classes
        this.textContent.querySelectorAll('.char').forEach(char => {
            char.classList.remove('current');
        });
        
        // Find and highlight current character
        const currentChar = this.textContent.querySelector(
            `[data-line-index="${this.currentLineIndex}"][data-char-index="${this.currentLineCharIndex}"]`
        );
        if (currentChar) {
            currentChar.classList.add('current');
        }
    }
    
    splitTextPreservingCombining(text) {
        // Split text while preserving combining diacritical marks
        const chars = [];
        let i = 0;
        
        while (i < text.length) {
            let char = text[i];
            i++;
            
            // Check for combining diacritical marks that follow the current character
            while (i < text.length && this.isCombiningMark(text.codePointAt(i))) {
                char += text[i];
                i++;
            }
            
            chars.push(char);
        }
        
        return chars;
    }
    
    isCombiningMark(codePoint) {
        // Check if character is a combining diacritical mark
        return (
            (codePoint >= 0x0300 && codePoint <= 0x036F) || // Combining Diacritical Marks
            (codePoint >= 0x1AB0 && codePoint <= 0x1AFF) || // Combining Diacritical Marks Extended
            (codePoint >= 0x1DC0 && codePoint <= 0x1DFF) || // Combining Diacritical Marks Supplement
            (codePoint >= 0x20D0 && codePoint <= 0x20FF) || // Combining Diacritical Marks for Symbols
            (codePoint >= 0xFE20 && codePoint <= 0xFE2F)    // Combining Half Marks
        );
    }
    
    startTest() {
        if (this.isTestActive || this.isTestComplete) return;
        
        this.isTestActive = true;
        this.startTime = Date.now();
        this.timeRemaining = this.testDuration;
        
        // Start the timer
        this.startTimer();
        
        console.log(`Test started for ${this.testDuration} seconds`);
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.isTestActive && !this.isTestComplete) {
                const elapsed = (Date.now() - this.startTime) / 1000;
                this.timeRemaining = Math.max(0, this.testDuration - elapsed);
                
                this.timeElement.textContent = Math.ceil(this.timeRemaining) + 's';
                this.updateLiveStats();
                
                // Check if time is up
                if (this.timeRemaining <= 0) {
                    this.completeTest();
                }
            }
        }, 100);
    }
    
    handleTyping(e) {
        const inputText = e.target.value;
        
        // Start the test automatically on first keystroke
        if (!this.isTestActive && !this.isTestComplete && inputText.length > 0) {
            this.startTest();
        }
        
        // Only process if test is active
        if (!this.isTestActive || this.isTestComplete) return;
        
        // Update character highlighting
        this.updateCharacterHighlighting(inputText);
        
    }
    
    handleKeyDown(e) {
        // Prevent certain keys that might interfere
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }
    
    updateCharacterHighlighting(inputText) {
        const chars = this.textContent.querySelectorAll('.char');
        let currentLineErrors = 0;
        
        // Get current line text and split it the same way as display (with space added)
        const currentLineText = this.textLines[this.currentLineIndex] + ' ';
        const expectedChars = this.splitTextPreservingCombining(currentLineText);
        
        // Track position in input text
        let inputIndex = 0;
        let foundCurrentChar = false;
        let currentCharElement = null;
        
        // DEBUG: Focus on visual rendering issues
        console.log('=== VISUAL RENDERING DEBUG ===');
        console.log('Input length:', inputText.length, 'Expected chars:', expectedChars.length);
        
        chars.forEach((char, globalCharIndex) => {
            const lineIndex = parseInt(char.dataset.lineIndex);
            const charIndex = parseInt(char.dataset.charIndex);
            
            // Store previous classes for comparison
            const previousClasses = char.className;
            char.className = 'char';
            
            if (lineIndex === this.currentLineIndex) {
                const expectedChar = expectedChars[charIndex];
                
                if (inputIndex < inputText.length && !foundCurrentChar) {
                    // Get the portion of input text that should match this expected character
                    const inputSegment = inputText.substr(inputIndex, expectedChar.length);
                    
                    if (inputSegment.length === expectedChar.length) {
                        // Full character typed - check if correct or incorrect
                        if (inputSegment === expectedChar) {
                            char.classList.add('correct');
                        } else {
                            char.classList.add('incorrect');
                            currentLineErrors++;
                        }
                        inputIndex += expectedChar.length;
                    } else if (inputSegment.length < expectedChar.length && inputIndex + inputSegment.length === inputText.length) {
                        // Partially typed character - this is the current character being typed
                        char.classList.add('current');
                        foundCurrentChar = true;
                        currentCharElement = char;
                    }
                } else if (inputIndex === inputText.length && !foundCurrentChar) {
                    // Next character to be typed (only highlight the first one we encounter)
                    char.classList.add('current');
                    foundCurrentChar = true;
                    currentCharElement = char;
                }
                
                // DEBUG: Log visual changes
                if (char.className !== previousClasses) {
                    console.log(`Char ${charIndex} "${expectedChar}": ${previousClasses} → ${char.className}`);
                    
                    // Check if element is actually visible
                    const rect = char.getBoundingClientRect();
                    const computedStyle = window.getComputedStyle(char);
                    console.log(`  Visibility: display=${computedStyle.display}, opacity=${computedStyle.opacity}, visibility=${computedStyle.visibility}`);
                    console.log(`  Position: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`);
                    
                    if (char.classList.contains('current')) {
                        console.log(`  CURRENT CHAR: "${expectedChar}" at position ${charIndex}`);
                        console.log(`  Background: ${computedStyle.backgroundColor}`);
                        console.log(`  Color: ${computedStyle.color}`);
                    }
                }
            }
        });
        
        // Additional check for current character visibility
        if (currentCharElement) {
            setTimeout(() => {
                const rect = currentCharElement.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(currentCharElement);
                console.log('CURRENT CHAR AFTER RENDER:');
                console.log(`  Element: ${currentCharElement.textContent}`);
                console.log(`  Classes: ${currentCharElement.className}`);
                console.log(`  Visible: ${rect.width > 0 && rect.height > 0}`);
                console.log(`  Display: ${computedStyle.display}`);
                console.log(`  Opacity: ${computedStyle.opacity}`);
            }, 0);
        }
        
        console.log('===============================');
        
        this.errors = currentLineErrors;
        this.currentLineCharIndex = inputText.length;
        
        // Check if current line is completed by comparing with expected total length
        const expectedTotalLength = expectedChars.reduce((sum, char) => sum + char.length, 0);
        if (inputText.length >= expectedTotalLength) {
            this.completeCurrentLine();
        }
        
        // Update progress based on time
        const timeProgress = ((this.testDuration - this.timeRemaining) / this.testDuration) * 100;
        this.progressFill.style.width = timeProgress + '%';
        this.progressText.textContent = Math.round(timeProgress) + '%';
    }
    
    completeCurrentLine() {
        // Add completed line stats to totals
        const completedLineLength = this.textLines[this.currentLineIndex].length + 1; // +1 for the space we added
        this.totalCharsTyped += completedLineLength;
        this.totalErrors += this.errors;
        
        // Move to next line (scroll one line at a time)
        this.currentLineIndex++;
        this.currentLineCharIndex = 0;
        this.errors = 0; // Reset current line errors
        
        // Clear input for next line
        this.typingInput.value = '';
        
        // Add more lines if needed (keep buffer of lines ahead)
        if (this.currentLineIndex > this.textLines.length - 5) {
            this.generateMoreDynamicLines();
        }
        
        // Update display to show next 2 lines (user always types on top line)
        this.setupTextDisplay();
        
        // Add smooth transition effect
        this.addLineTransitionEffect();
    }
    
    addLineTransitionEffect() {
        // Add a subtle animation when moving to next line
        const activeLines = this.textContent.querySelectorAll('.active-line');
        activeLines.forEach(line => {
            line.style.transform = 'translateY(-2px)';
            line.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                line.style.transform = 'translateY(0)';
            }, 200);
        });
    }
    
    // Method removed - functionality moved to generateMoreDynamicLines()
    
    
    updateLiveStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        
        // Calculate total characters typed: completed lines + current line progress
        const currentTotalCharsTyped = this.totalCharsTyped + this.currentLineCharIndex;
        const currentTotalErrors = this.totalErrors + this.errors;
        
        const wordsTyped = currentTotalCharsTyped / 5; // Standard: 5 chars = 1 word
        const rawWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        const accuracy = currentTotalCharsTyped > 0 ?
            Math.round(((currentTotalCharsTyped - currentTotalErrors) / currentTotalCharsTyped) * 100) : 100;
        
        // Apply accuracy penalty to WPM
        const accuracyFactor = (accuracy / 100) ** 2;
        const adjustedWpm = Math.round(rawWpm * accuracyFactor);
        
        this.wpmElement.textContent = adjustedWpm;
        this.accuracyElement.textContent = accuracy + '%';
    }
    
    completeTest() {
        this.isTestActive = false;
        this.isTestComplete = true;
        this.endTime = Date.now();
        clearInterval(this.timerInterval);
        
        // Calculate final stats
        const timeElapsed = (this.endTime - this.startTime) / 1000;
        const timeInMinutes = timeElapsed / 60;
        
        // Calculate total characters typed: completed lines + current line progress
        const finalTotalCharsTyped = this.totalCharsTyped + this.currentLineCharIndex;
        const finalTotalErrors = this.totalErrors + this.errors;
        
        const wordsTyped = finalTotalCharsTyped / 5;
        const rawWpm = Math.round(wordsTyped / timeInMinutes);
        const accuracy = finalTotalCharsTyped > 0 ?
            Math.round(((finalTotalCharsTyped - finalTotalErrors) / finalTotalCharsTyped) * 100) : 100;
        
        // Apply accuracy penalty to WPM
        const accuracyFactor = (accuracy / 100) ** 2;
        const adjustedWpm = Math.round(rawWpm * accuracyFactor);
        
        // Update user stats
        this.updateUserStats(adjustedWpm, accuracy, timeElapsed);
        
        // Show results
        this.showResults(adjustedWpm, accuracy, timeElapsed);
    }
    
    updateUserStats(wpm, accuracy, time) {
        this.userStats.testsCompleted++;
        this.userStats.bestWPM = Math.max(this.userStats.bestWPM, wpm);
        this.userStats.bestAccuracy = Math.max(this.userStats.bestAccuracy, accuracy);
        
        // Track WPM history
        if (!this.userStats.wpmHistory) {
            this.userStats.wpmHistory = [];
        }
        this.userStats.wpmHistory.push({
            date: new Date().toISOString(),
            wpm: wpm,
            accuracy: accuracy,
            duration: this.testDuration
        });
        
        // Keep only last 50 sessions
        if (this.userStats.wpmHistory.length > 50) {
            this.userStats.wpmHistory = this.userStats.wpmHistory.slice(-50);
        }
        
        this.saveUserStats();
        this.updateHeaderStats();
    }
    
    showResults(wpm, accuracy, time) {
        // Update result display
        document.getElementById('final-wpm').textContent = wpm;
        document.getElementById('final-accuracy').textContent = accuracy + '%';
        document.getElementById('final-time').textContent = this.testDuration + 's';
        
        // Performance message
        const message = getPerformanceMessage(wpm, accuracy);
        document.getElementById('performance-message').textContent = message;
        
        // Check for achievements
        this.checkAchievements();
        
        // Show modal
        this.resultsModal.style.display = 'flex';
    }
    
    checkAchievements() {
        const achievementBadge = document.getElementById('achievement-badge');
        const achievementText = document.getElementById('achievement-text');
        
        for (const achievement of ACHIEVEMENTS) {
            if (!this.userStats.achievements.includes(achievement.id) && 
                achievement.condition(this.userStats)) {
                
                this.userStats.achievements.push(achievement.id);
                this.saveUserStats();
                
                // Show achievement
                achievementText.textContent = achievement.name;
                achievementBadge.style.display = 'flex';
                
                // Add celebration effect
                this.celebrateAchievement();
                break;
            }
        }
    }
    
    celebrateAchievement() {
        const badge = document.getElementById('achievement-badge');
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'pulse 0.6s ease-in-out 3';
        }, 10);
    }
    
    resetTest() {
        this.isTestActive = false;
        this.isTestComplete = false;
        clearInterval(this.timerInterval);
        
        this.typingInput.value = '';
        this.typingInput.disabled = false;
        
        // Get selected duration
        const selectedDuration = document.querySelector('input[name="duration"]:checked');
        if (selectedDuration) {
            this.testDuration = parseInt(selectedDuration.value);
        }
        this.timeRemaining = this.testDuration;
        
        this.generateNewText();
        this.resetStats();
        
        // Focus on input
        setTimeout(() => this.typingInput.focus(), 100);
    }
    
    resetStats() {
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.timeElement.textContent = this.testDuration + 's';
        this.progressFill.style.width = '0%';
        this.progressText.textContent = '0%';
        this.currentCharIndex = 0;
        this.errors = 0;
        this.totalCharsTyped = 0;
        this.totalErrors = 0;
    }
    
    tryAgain() {
        this.resultsModal.style.display = 'none';
        document.getElementById('achievement-badge').style.display = 'none';
        this.resetTest();
    }
    
    newChallenge() {
        this.resultsModal.style.display = 'none';
        document.getElementById('achievement-badge').style.display = 'none';
        this.resetTest();
    }
    
    updateHeaderStats() {
        this.bestWpmElement.textContent = this.userStats.bestWPM;
    }
    
    loadUserStats() {
        const defaultStats = {
            bestWPM: 0,
            bestAccuracy: 0,
            testsCompleted: 0,
            achievements: [],
            wpmHistory: []
        };
        
        try {
            const saved = localStorage.getItem('copticTypingStats');
            return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
        } catch (e) {
            return defaultStats;
        }
    }
    
    saveUserStats() {
        try {
            localStorage.setItem('copticTypingStats', JSON.stringify(this.userStats));
        } catch (e) {
            console.warn('Could not save user stats to localStorage');
        }
    }
    
    showWPMGraph() {
        const modal = document.getElementById('wmp-graph-modal');
        const canvas = document.getElementById('wpm-chart');
        const ctx = canvas.getContext('2d');
        
        // Show modal
        modal.style.display = 'flex';
        
        // Get WPM history
        const history = this.userStats.wpmHistory || [];
        
        if (history.length === 0) {
            // Show message if no data
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#718096';
            ctx.font = '16px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('No practice sessions yet!', canvas.width / 2, canvas.height / 2);
            ctx.fillText('Complete some typing tests to see your progress.', canvas.width / 2, canvas.height / 2 + 25);
            
            // Update stats
            document.getElementById('avg-wpm').textContent = '0';
            document.getElementById('sessions-count').textContent = '0';
            document.getElementById('improvement').textContent = '+0';
            return;
        }
        
        // Calculate stats
        const avgWpm = Math.round(history.reduce((sum, session) => sum + session.wpm, 0) / history.length);
        const improvement = history.length > 1 ? history[history.length - 1].wpm - history[0].wpm : 0;
        
        // Update stats display
        document.getElementById('avg-wpm').textContent = avgWpm;
        document.getElementById('sessions-count').textContent = history.length;
        document.getElementById('improvement').textContent = improvement > 0 ? `+${improvement}` : improvement;
        
        // Draw chart
        this.drawWPMChart(ctx, canvas, history);
    }
    
    drawWPMChart(ctx, canvas, history) {
        // Implementation similar to before but simplified
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple chart implementation
        ctx.fillStyle = '#2D3748';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Words Per Minute Over Time', canvas.width / 2, 25);
        
        if (history.length > 1) {
            const wpmValues = history.map(session => session.wpm);
            const minWpm = Math.max(0, Math.min(...wpmValues) - 5);
            const maxWpm = Math.max(...wpmValues) + 5;
            const wpmRange = maxWpm - minWpm;
            
            // Draw line
            ctx.strokeStyle = '#8B1538';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            history.forEach((session, index) => {
                const x = padding + (chartWidth / (history.length - 1)) * index;
                const y = padding + chartHeight - ((session.wpm - minWpm) / wpmRange) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
        }
    }
}

// Add CSS animation for achievement celebration and space indicator
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.3; }
    }
    
    .duration-panel {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .duration-options {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .duration-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 2px solid #E2E8F0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .duration-option:hover {
        border-color: #8B1538;
        background-color: #FFF5F5;
    }
    
    .duration-option input[type="radio"] {
        margin: 0;
    }
    
    .duration-option input[type="radio"]:checked + span {
        color: #8B1538;
        font-weight: 600;
    }
    
    .text-line {
        line-height: 2.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        padding: 0.25rem 0;
    }
    
    .text-line.active-line {
        opacity: 1;
        font-weight: 500;
        border-left: 3px solid #8B1538;
        padding-left: 0.5rem;
        background: linear-gradient(90deg, rgba(139, 21, 56, 0.05) 0%, transparent 100%);
    }
    
    .text-line.preview-line {
        opacity: 0.6;
        font-weight: 400;
        padding-left: 0.75rem;
    }
    
    .text-content {
        min-height: 6rem;
        max-height: 6rem;
        overflow: hidden;
        position: relative;
    }
    
    /* Responsive font sizes */
    @media (max-width: 768px) {
        .text-line {
            font-size: 1.25rem;
            line-height: 2rem;
        }
    }
    
    @media (max-width: 480px) {
        .text-line {
            font-size: 1.125rem;
            line-height: 1.75rem;
        }
    }
    
    /* Safari diacritical mark rendering fixes */
    .char {
        font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "mark" 1, "mkmk" 1;
        -webkit-font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "mark" 1, "mkmk" 1;
        text-rendering: optimizeLegibility;
        -webkit-text-rendering: optimizeLegibility;
        font-variant-ligatures: common-ligatures contextual;
        -webkit-font-variant-ligatures: common-ligatures contextual;
    }
    
    .text-content, .typing-input {
        font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "mark" 1, "mkmk" 1;
        -webkit-font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "mark" 1, "mkmk" 1;
        text-rendering: optimizeLegibility;
        -webkit-text-rendering: optimizeLegibility;
        font-variant-ligatures: common-ligatures contextual;
        -webkit-font-variant-ligatures: common-ligatures contextual;
        unicode-bidi: bidi-override;
        direction: ltr;
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CopticTypingTest();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('results-modal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.getElementById('achievement-badge').style.display = 'none';
        }
    }
});

// Prevent accidental page refresh during test
window.addEventListener('beforeunload', (e) => {
    const input = document.getElementById('typing-input');
    const hasContent = input && input.value.length > 0;
    
    if (hasContent) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});