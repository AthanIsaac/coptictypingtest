// Coptic Typing Test - Main Application Logic
class CopticTypingTest {
    constructor() {
        this.currentDifficulty = null;
        this.currentText = null;
        this.startTime = null;
        this.endTime = null;
        this.isTestActive = false;
        this.currentCharIndex = 0;
        this.errors = 0;
        this.totalChars = 0;
        
        // Word generator and settings
        this.wordGenerator = new CopticWordGenerator();
        this.settings = {
            includePunctuation: true,
            includeUppercase: true,
            textMode: 'mixed' // 'mixed', 'curated', or 'generated'
        };
        
        // User statistics
        this.userStats = this.loadUserStats();
        
        // DOM elements
        this.difficultyPanel = document.getElementById('difficulty-panel');
        this.typingArea = document.getElementById('typing-area');
        this.textContent = document.getElementById('text-content');
        this.typingInput = document.getElementById('typing-input');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.backBtn = document.getElementById('back-btn');
        this.resultsModal = document.getElementById('results-modal');
        
        // Stats elements
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.timeElement = document.getElementById('time');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        
        // Header stats
        this.levelElement = document.getElementById('level');
        this.scoreElement = document.getElementById('score');
        this.bestWpmElement = document.getElementById('best-wpm');
        
        this.initializeEventListeners();
        this.updateHeaderStats();
        
        // Debug: Check if all elements are found
        console.log('CopticTypingTest initialized');
        console.log('Elements found:', {
            difficultyPanel: !!this.difficultyPanel,
            typingArea: !!this.typingArea,
            textContent: !!this.textContent,
            typingInput: !!this.typingInput,
            startBtn: !!this.startBtn
        });
    }
    
    initializeEventListeners() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                this.selectDifficulty(difficulty);
            });
        });
        
        // Control buttons
        this.startBtn.addEventListener('click', () => this.startTest());
        this.resetBtn.addEventListener('click', () => this.resetTest());
        this.backBtn.addEventListener('click', () => this.backToMenu());
        
        // Settings toggle button - FIX: Add missing event listener
        const settingsToggle = document.getElementById('settings-toggle');
        if (settingsToggle) {
            settingsToggle.addEventListener('click', () => {
                console.log('Settings toggle clicked');
                this.toggleSettings();
            });
            console.log('Settings toggle event listener added');
        } else {
            console.error('Settings toggle button not found!');
        }
        
        // Typing input
        this.typingInput.addEventListener('input', (e) => this.handleTyping(e));
        this.typingInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Modal buttons
        document.getElementById('try-again-btn').addEventListener('click', () => this.tryAgain());
        document.getElementById('new-challenge-btn').addEventListener('click', () => this.newChallenge());
        
        // Prevent context menu on text display
        this.textContent.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Add click handler to logo/title to go back to home
        const logoTitle = document.querySelector('.logo h1');
        if (logoTitle) {
            logoTitle.style.cursor = 'pointer';
            logoTitle.addEventListener('click', () => this.backToMenu());
        }
        
        // Add click handler to Best WPM stat to show graph
        this.bestWpmElement.addEventListener('click', () => this.showWPMGraph());
        
        // Add close button handler for WPM graph modal
        document.getElementById('close-graph-btn').addEventListener('click', () => {
            document.getElementById('wpm-graph-modal').style.display = 'none';
        });
        
        // Initialize settings functionality
        this.initializeSettings();
    }
    
    selectDifficulty(difficulty) {
        console.log('Selecting difficulty:', difficulty);
        this.currentDifficulty = difficulty;
        this.currentText = this.generateTextBasedOnSettings(difficulty);
        
        console.log('Selected text:', this.currentText);
        console.log('Current settings:', this.settings);
        
        // Hide difficulty panel and show typing area
        this.difficultyPanel.style.display = 'none';
        this.typingArea.style.display = 'block';
        
        // Setup the text display
        this.setupTextDisplay();
        this.resetStats();
        
        // Enable typing input immediately and clear any existing content
        this.typingInput.disabled = false;
        this.typingInput.value = '';
        this.typingInput.focus();
        
        console.log('Typing input enabled and focused');
    }
    
    setupTextDisplay() {
        const text = this.currentText.coptic;
        this.textContent.innerHTML = '';
        
        // Create character spans
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.className = 'char';
            if (i === 0) span.classList.add('current');
            this.textContent.appendChild(span);
        }
        
        this.totalChars = text.length;
        this.currentCharIndex = 0;
        this.errors = 0;
    }
    
    startTest() {
        if (this.isTestActive) return; // Prevent double-start
        
        this.isTestActive = true;
        this.startTime = Date.now();
        this.typingInput.disabled = false;
        this.typingInput.focus();
        this.startBtn.style.display = 'none';
        this.resetBtn.style.display = 'inline-flex';
        
        // Start the timer
        this.startTimer();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.isTestActive) {
                const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                this.timeElement.textContent = elapsed + 's';
                this.updateLiveStats();
            }
        }, 100);
    }
    
    handleTyping(e) {
        const inputText = e.target.value;
        const targetText = this.currentText.coptic;
        
        // Start the test automatically on first keystroke
        if (!this.isTestActive && inputText.length > 0) {
            this.startTest();
        }
        
        // Only process if test is active
        if (!this.isTestActive) return;
        
        // Update character highlighting
        this.updateCharacterHighlighting(inputText, targetText);
        
        // Check if test is complete
        if (inputText.length === targetText.length) {
            this.completeTest();
        }
    }
    
    handleKeyDown(e) {
        // Prevent certain keys that might interfere
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }
    
    updateCharacterHighlighting(inputText, targetText) {
        const chars = this.textContent.querySelectorAll('.char');
        let errorCount = 0;
        
        chars.forEach((char, index) => {
            char.className = 'char';
            
            if (index < inputText.length) {
                if (inputText[index] === targetText[index]) {
                    char.classList.add('correct');
                } else {
                    char.classList.add('incorrect');
                    errorCount++;
                }
            } else if (index === inputText.length) {
                char.classList.add('current');
            }
        });
        
        this.errors = errorCount;
        this.currentCharIndex = inputText.length;
        
        // Update progress
        const progress = (inputText.length / targetText.length) * 100;
        this.progressFill.style.width = progress + '%';
        this.progressText.textContent = Math.round(progress) + '%';
    }
    
    updateLiveStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.currentCharIndex / 5; // Standard: 5 chars = 1 word
        const rawWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        const accuracy = this.currentCharIndex > 0 ?
            Math.round(((this.currentCharIndex - this.errors) / this.currentCharIndex) * 100) : 100;
        
        // Apply accuracy penalty to WPM: Adjusted WPM = Raw WPM × (Accuracy / 100)²
        const accuracyFactor = (accuracy / 100) ** 2;
        const adjustedWpm = Math.round(rawWpm * accuracyFactor);
        
        this.wpmElement.textContent = adjustedWpm;
        this.accuracyElement.textContent = accuracy + '%';
    }
    
    completeTest() {
        this.isTestActive = false;
        this.endTime = Date.now();
        clearInterval(this.timerInterval);
        
        // Calculate final stats
        const timeElapsed = (this.endTime - this.startTime) / 1000;
        const timeInMinutes = timeElapsed / 60;
        const wordsTyped = this.totalChars / 5;
        const rawWpm = Math.round(wordsTyped / timeInMinutes);
        const accuracy = Math.round(((this.totalChars - this.errors) / this.totalChars) * 100);
        
        // Apply accuracy penalty to WPM: Adjusted WPM = Raw WPM × (Accuracy / 100)²
        const accuracyFactor = (accuracy / 100) ** 2;
        const adjustedWpm = Math.round(rawWpm * accuracyFactor);
        
        // Calculate score using adjusted WPM
        const difficultyMultiplier = DIFFICULTY_SETTINGS[this.currentDifficulty].timeBonus;
        const baseScore = adjustedWpm * accuracy;
        const finalScore = Math.round(baseScore * difficultyMultiplier);
        
        // Update user stats
        this.updateUserStats(adjustedWpm, accuracy, finalScore, timeElapsed);
        
        // Show results
        this.showResults(adjustedWpm, accuracy, finalScore, timeElapsed);
    }
    
    updateUserStats(wpm, accuracy, score, time) {
        this.userStats.testsCompleted++;
        this.userStats.totalScore += score;
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
            difficulty: this.currentDifficulty
        });
        
        // Keep only last 50 sessions to avoid storage bloat
        if (this.userStats.wpmHistory.length > 50) {
            this.userStats.wpmHistory = this.userStats.wpmHistory.slice(-50);
        }
        
        // Track difficulty-specific stats
        if (this.currentDifficulty === 'advanced') {
            this.userStats.advancedCompleted++;
        }
        
        // Level progression (every 1000 points = 1 level)
        const newLevel = Math.floor(this.userStats.totalScore / 1000) + 1;
        if (newLevel > this.userStats.level) {
            this.userStats.level = newLevel;
        }
        
        this.saveUserStats();
        this.updateHeaderStats();
    }
    
    showResults(wpm, accuracy, score, time) {
        // Update result display
        document.getElementById('final-wpm').textContent = wpm;
        document.getElementById('final-accuracy').textContent = accuracy + '%';
        document.getElementById('final-time').textContent = Math.round(time) + 's';
        document.getElementById('final-score').textContent = score;
        
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
        // Simple celebration animation
        const badge = document.getElementById('achievement-badge');
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'pulse 0.6s ease-in-out 3';
        }, 10);
    }
    
    resetTest() {
        this.isTestActive = false;
        clearInterval(this.timerInterval);
        
        this.typingInput.value = '';
        this.typingInput.disabled = true;
        this.startBtn.style.display = 'inline-flex';
        this.resetBtn.style.display = 'none';
        
        this.setupTextDisplay();
        this.resetStats();
    }
    
    resetStats() {
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.timeElement.textContent = '0s';
        this.progressFill.style.width = '0%';
        this.progressText.textContent = '0%';
    }
    
    backToMenu() {
        this.resetTest();
        this.typingArea.style.display = 'none';
        this.difficultyPanel.style.display = 'block';
        this.currentDifficulty = null;
        this.currentText = null;
    }
    
    tryAgain() {
        this.resultsModal.style.display = 'none';
        document.getElementById('achievement-badge').style.display = 'none';
        this.resetTest();
    }
    
    newChallenge() {
        this.resultsModal.style.display = 'none';
        document.getElementById('achievement-badge').style.display = 'none';
        this.currentText = this.generateTextBasedOnSettings(this.currentDifficulty);
        this.setupTextDisplay();
        this.resetStats();
        
        // Clear the input box and reset typing state
        this.typingInput.value = '';
        this.typingInput.disabled = false;
        this.typingInput.focus();
        this.isTestActive = false;
        this.startBtn.style.display = 'inline-flex';
        this.resetBtn.style.display = 'none';
    }
    
    updateHeaderStats() {
        this.levelElement.textContent = this.userStats.level;
        this.scoreElement.textContent = this.userStats.totalScore.toLocaleString();
        this.bestWpmElement.textContent = this.userStats.bestWPM;
    }
    
    loadUserStats() {
        const defaultStats = {
            level: 1,
            totalScore: 0,
            bestWPM: 0,
            bestAccuracy: 0,
            testsCompleted: 0,
            advancedCompleted: 0,
            achievements: [],
            wpmHistory: [] // Array of {date, wpm, accuracy} objects
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
    
    initializeSettings() {
        // Load saved settings
        this.loadSettings();
        
        // Update UI to reflect current settings
        this.updateSettingsUI();
        
        // Add event listeners for settings controls
        const punctuationCheckbox = document.getElementById('include-punctuation');
        const uppercaseCheckbox = document.getElementById('include-uppercase');
        const textModeRadios = document.querySelectorAll('input[name="text-mode"]');
        
        if (punctuationCheckbox) {
            punctuationCheckbox.addEventListener('change', () => {
                console.log('Punctuation setting changed:', punctuationCheckbox.checked);
                this.updateSettings();
            });
        }
        
        if (uppercaseCheckbox) {
            uppercaseCheckbox.addEventListener('change', () => {
                console.log('Uppercase setting changed:', uppercaseCheckbox.checked);
                this.updateSettings();
            });
        }
        
        textModeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    console.log('Text mode changed to:', radio.value);
                    this.updateSettings();
                }
            });
        });
        
        console.log('Settings initialized with values:', this.settings);
    }
    
    toggleSettings() {
        const settingsContent = document.getElementById('settings-content');
        const settingsToggle = document.getElementById('settings-toggle');
        
        if (settingsContent.style.display === 'none' || !settingsContent.style.display) {
            settingsContent.style.display = 'block';
            settingsToggle.innerHTML = '<i class="fas fa-cog"></i> Hide Settings';
        } else {
            settingsContent.style.display = 'none';
            settingsToggle.innerHTML = '<i class="fas fa-cog"></i> Practice Settings';
        }
    }
    
    updateSettings() {
        // Get current settings from UI
        const punctuationCheckbox = document.getElementById('include-punctuation');
        const uppercaseCheckbox = document.getElementById('include-uppercase');
        const textModeRadios = document.querySelectorAll('input[name="text-mode"]');
        
        if (punctuationCheckbox) this.settings.includePunctuation = punctuationCheckbox.checked;
        if (uppercaseCheckbox) this.settings.includeUppercase = uppercaseCheckbox.checked;
        
        // Handle radio buttons for text mode
        textModeRadios.forEach(radio => {
            if (radio.checked) {
                this.settings.textMode = radio.value;
            }
        });
        
        // Save settings
        this.saveSettings();
        
        console.log('Settings updated:', this.settings);
    }
    
    updateSettingsUI() {
        const punctuationCheckbox = document.getElementById('include-punctuation');
        const uppercaseCheckbox = document.getElementById('include-uppercase');
        const textModeRadios = document.querySelectorAll('input[name="text-mode"]');
        
        if (punctuationCheckbox) punctuationCheckbox.checked = this.settings.includePunctuation;
        if (uppercaseCheckbox) uppercaseCheckbox.checked = this.settings.includeUppercase;
        
        // Set the correct radio button based on current text mode
        textModeRadios.forEach(radio => {
            radio.checked = radio.value === this.settings.textMode;
        });
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('copticTypingSettings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load settings from localStorage');
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('copticTypingSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Could not save settings to localStorage');
        }
    }
    
    generateTextBasedOnSettings(difficulty) {
        if (this.settings.textMode === 'generated') {
            // Use word generator for random text only
            let textObj = this.wordGenerator.generateRandomText(difficulty);
            let copticText = textObj.coptic;
            
            // Apply settings modifications
            if (!this.settings.includePunctuation) {
                copticText = copticText.replace(/[.,;:!?؛]/g, '');
            }
            
            if (!this.settings.includeUppercase) {
                // Manual lowercase conversion for Coptic characters
                copticText = this.convertCopticToLowercase(copticText);
            }
            
            return {
                coptic: copticText.trim(),
                english: `Generated ${difficulty} level Coptic words`,
                difficulty: difficulty
            };
        } else if (this.settings.textMode === 'curated') {
            // Use original liturgical texts only
            let liturgicalText = getRandomText(difficulty);
            
            // Apply settings to liturgical text
            if (!this.settings.includePunctuation) {
                liturgicalText.coptic = liturgicalText.coptic.replace(/[.,;:!?؛]/g, '');
            }
            
            if (!this.settings.includeUppercase) {
                liturgicalText.coptic = this.convertCopticToLowercase(liturgicalText.coptic);
            }
            
            return liturgicalText;
        } else {
            // Mixed mode - randomly choose between curated and generated
            const useGenerated = Math.random() < 0.5;
            if (useGenerated) {
                let textObj = this.wordGenerator.generateRandomText(difficulty);
                let copticText = textObj.coptic;
                
                if (!this.settings.includePunctuation) {
                    copticText = copticText.replace(/[.,;:!?؛]/g, '');
                }
                
                if (!this.settings.includeUppercase) {
                    copticText = this.convertCopticToLowercase(copticText);
                }
                
                return {
                    coptic: copticText.trim(),
                    english: `Mixed: Generated ${difficulty} level Coptic words`,
                    difficulty: difficulty
                };
            } else {
                let liturgicalText = getRandomText(difficulty);
                
                // Apply settings to liturgical text too
                if (!this.settings.includePunctuation) {
                    liturgicalText.coptic = liturgicalText.coptic.replace(/[.,;:!?؛]/g, '');
                }
                
                if (!this.settings.includeUppercase) {
                    liturgicalText.coptic = this.convertCopticToLowercase(liturgicalText.coptic);
                }
                
                return liturgicalText;
            }
        }
    }
    
    // Helper method to convert Coptic text to lowercase manually
    convertCopticToLowercase(text) {
        // Coptic uppercase to lowercase mapping
        const copticCaseMap = {
            'Ⲁ': 'ⲁ', 'Ⲃ': 'ⲃ', 'Ⲅ': 'ⲅ', 'Ⲇ': 'ⲇ', 'Ⲉ': 'ⲉ', 'Ⲋ': 'ⲋ', 'Ⲍ': 'ⲍ', 'Ⲏ': 'ⲏ',
            'Ⲑ': 'ⲑ', 'Ⲓ': 'ⲓ', 'Ⲕ': 'ⲕ', 'Ⲗ': 'ⲗ', 'Ⲙ': 'ⲙ', 'Ⲛ': 'ⲛ', 'Ⲝ': 'ⲝ', 'Ⲟ': 'ⲟ',
            'Ⲡ': 'ⲡ', 'Ⲣ': 'ⲣ', 'Ⲥ': 'ⲥ', 'Ⲧ': 'ⲧ', 'Ⲩ': 'ⲩ', 'Ⲫ': 'ⲫ', 'Ⲭ': 'ⲭ', 'Ⲯ': 'ⲯ',
            'Ⲱ': 'ⲱ', 'Ⲳ': 'ⲳ', 'Ⲵ': 'ⲵ', 'Ⲷ': 'ⲷ', 'Ⲹ': 'ⲹ', 'Ⲻ': 'ⲻ', 'Ⲽ': 'ⲽ', 'Ⲿ': 'ⲿ',
            'Ⳁ': 'ⳁ', 'Ⳃ': 'ⳃ', 'Ⳅ': 'ⳅ', 'Ⳇ': 'ⳇ', 'Ⳉ': 'ⳉ', 'Ⳋ': 'ⳋ', 'Ⳍ': 'ⳍ', 'Ⳏ': 'ⳏ',
            'Ⳑ': 'ⳑ', 'Ⳓ': 'ⳓ', 'Ⳕ': 'ⳕ', 'Ⳗ': 'ⳗ', 'Ⳙ': 'ⳙ', 'Ⳛ': 'ⳛ', 'Ⳝ': 'ⳝ', 'Ⳟ': 'ⳟ',
            'Ⳡ': 'ⳡ', 'Ⳣ': 'ⳣ'
        };
        
        let result = '';
        for (let char of text) {
            result += copticCaseMap[char] || char;
        }
        return result;
    }
    
    showWPMGraph() {
        const modal = document.getElementById('wpm-graph-modal');
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
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get min/max WPM for scaling
        const wpmValues = history.map(session => session.wpm);
        const minWpm = Math.max(0, Math.min(...wpmValues) - 5);
        const maxWpm = Math.max(...wpmValues) + 5;
        const wpmRange = maxWpm - minWpm;
        
        // Draw grid lines
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
            
            // Y-axis labels
            const wpmValue = Math.round(maxWpm - (wpmRange / 5) * i);
            ctx.fillStyle = '#718096';
            ctx.font = '12px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(wpmValue + ' WPM', padding - 10, y + 4);
        }
        
        // Draw chart line
        if (history.length > 1) {
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
            
            // Draw points
            ctx.fillStyle = '#D4AF37';
            history.forEach((session, index) => {
                const x = padding + (chartWidth / (history.length - 1)) * index;
                const y = padding + chartHeight - ((session.wpm - minWpm) / wpmRange) * chartHeight;
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        
        // Draw axes
        ctx.strokeStyle = '#4A5568';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.stroke();
        
        // X-axis labels (session numbers)
        ctx.fillStyle = '#718096';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        const labelStep = Math.max(1, Math.floor(history.length / 8));
        for (let i = 0; i < history.length; i += labelStep) {
            const x = padding + (chartWidth / (history.length - 1)) * i;
            ctx.fillText(`#${i + 1}`, x, padding + chartHeight + 20);
        }
        
        // Chart title
        ctx.fillStyle = '#2D3748';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Words Per Minute Over Time', canvas.width / 2, 25);
    }
}

// Add CSS animation for achievement celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
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
    const typingArea = document.getElementById('typing-area');
    const isTestVisible = typingArea && typingArea.style.display !== 'none';
    const input = document.getElementById('typing-input');
    const hasContent = input && input.value.length > 0;
    
    if (isTestVisible && hasContent) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve mobile typing experience
    const typingInput = document.getElementById('typing-input');
    if (typingInput) {
        typingInput.addEventListener('touchstart', () => {
            typingInput.focus();
        });
    }
}