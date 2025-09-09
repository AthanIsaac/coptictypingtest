// Coptic File Loader - Uses embedded JavaScript data
class CopticFileLoader {
    constructor() {
        this.copticLines = [];
        this.isLoaded = false;
    }

    async loadCopticText() {
        try {
            // Use the embedded COPTIC_TEXT_LINES array
            if (typeof COPTIC_TEXT_LINES !== 'undefined') {
                this.copticLines = COPTIC_TEXT_LINES;
                this.isLoaded = true;
                console.log(`Loaded ${this.copticLines.length} Coptic text lines from embedded data`);
                return true;
            } else {
                throw new Error('COPTIC_TEXT_LINES not found');
            }
        } catch (error) {
            console.error('Error loading Coptic text data:', error);
            return false;
        }
    }

    getRandomText(difficulty) {
        if (!this.isLoaded || this.copticLines.length === 0) {
            // Fallback to a simple text if file not loaded
            return {
                coptic: "ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲡⲉⲛⲥⲱⲧⲏⲣ",
                english: "Let us worship our Savior",
                difficulty: difficulty
            };
        }

        // Select text based on difficulty
        let selectedLines;
        
        switch (difficulty) {
            case 'beginner':
                // Use shorter lines (up to 50 characters)
                selectedLines = this.copticLines.filter(line => line.length <= 50);
                break;
            case 'intermediate':
                // Use medium lines (20-100 characters)
                selectedLines = this.copticLines.filter(line => line.length > 20 && line.length <= 100);
                break;
            case 'advanced':
                // Use longer lines (over 50 characters)
                selectedLines = this.copticLines.filter(line => line.length > 50);
                break;
            default:
                selectedLines = this.copticLines;
        }

        // If no lines match the criteria, use all lines
        if (selectedLines.length === 0) {
            selectedLines = this.copticLines;
        }

        // For beginner, use single line
        // For intermediate and advanced, potentially combine multiple lines
        let finalText;
        if (difficulty === 'beginner') {
            finalText = selectedLines[Math.floor(Math.random() * selectedLines.length)];
        } else if (difficulty === 'intermediate') {
            // Use 1-2 lines
            const numLines = Math.random() < 0.7 ? 1 : 2;
            finalText = this.getRandomLines(selectedLines, numLines).join(' ');
        } else {
            // Advanced: use 1-3 lines
            const numLines = Math.random() < 0.4 ? 1 : (Math.random() < 0.7 ? 2 : 3);
            finalText = this.getRandomLines(selectedLines, numLines).join(' ');
        }

        return {
            coptic: finalText,
            english: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level Coptic text`,
            difficulty: difficulty
        };
    }

    getRandomLines(lines, count) {
        const result = [];
        const usedIndices = new Set();
        
        for (let i = 0; i < count && i < lines.length; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * lines.length);
            } while (usedIndices.has(randomIndex));
            
            usedIndices.add(randomIndex);
            result.push(lines[randomIndex]);
        }
        
        return result;
    }

    // Get a specific line by index (for testing)
    getLineByIndex(index) {
        if (!this.isLoaded || index < 0 || index >= this.copticLines.length) {
            return null;
        }
        return {
            coptic: this.copticLines[index],
            english: "Coptic text from file",
            difficulty: "custom"
        };
    }

    // Get total number of lines
    getTotalLines() {
        return this.copticLines.length;
    }
}

// Create global instance
const copticFileLoader = new CopticFileLoader();