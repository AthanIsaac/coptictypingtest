// Coptic Word Generator - Extract words from liturgical texts and generate random combinations
class CopticWordGenerator {
    constructor() {
        this.copticWords = [];
        this.settings = {
            includeUppercase: true,
            includePunctuation: true,
            minWords: 3,
            maxWords: 15
        };
        this.extractWordsFromText();
    }

    extractWordsFromText() {
        // Extract Coptic words from the provided text
        const copticTextLines = [
            "Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ ⲡⲓⲙⲁⲓⲣⲱⲙⲓ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ϫⲉ ⲛ̀ⲑⲟϥ ⲁϥϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ ⲁϥⲓ̀ ⲟⲩⲟϩ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ",
            "Ⲁⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ Ⲙⲁⲣⲓⲁ ⲑ̀ⲙⲁⲩ ⲙ̀ⲡⲉⲛⲥⲱⲧⲏⲣ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ",
            "Ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ",
            "Ϣⲗⲏⲗ Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ Ⲓⲣⲏⲛⲏ ⲡⲁⲥⲓ Ⲕⲉ ⲧⲱ ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲟⲩ",
            "Ⲡⲁⲗⲓⲛ ⲟⲛ ⲙⲁⲣⲉⲛϯϩⲟ ⲉ̀Ⲫⲛⲟⲩϯ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ Ⲫⲓⲱⲧ ⲙ̀Ⲡⲉⲛϭⲟⲓⲥ ⲟⲩⲟϩ Ⲡⲉⲛⲛⲟⲩϯ ⲟⲩⲟϩ ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ",
            "Ⲧⲉⲛϯϩⲟ ⲟⲩⲟϩ ⲧⲉⲛⲧⲱⲃϩ ⲛ̀ⲧⲉⲕⲙⲉⲧⲁ̀ⲅⲁⲑⲟⲥ ⲡⲓⲙⲁⲓⲣⲱⲙⲓ ⲁ̀ⲣⲓⲫ̀ⲙⲉⲩⲓ̀ Ⲡϭⲟⲓⲥ ⲛ̀ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ ⲧⲉⲕⲟⲩⲓ̀ ⲙ̀ⲙⲁⲩⲁⲧⲥ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲕⲁⲑⲟⲗⲓⲕⲏ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲓⲕⲏ ⲛ̀ⲉⲕⲕⲗⲏⲥⲓⲁ",
            "Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ Ⲁⲙⲏⲛ Ⲡⲉⲛⲓⲱⲧ ⲉⲧ ϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ Ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ",
            "Ⲧⲉⲛⲛⲁϩϯ ⲉ̀ⲟⲩⲛⲟⲩϯ ⲛ̀ⲟⲩⲱⲧ Ⲫⲛⲟⲩϯ Ⲫⲓⲱⲧ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲧ̀ⲫⲉ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ ⲛⲏⲉ̀ⲧⲟⲩⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲏⲉ̀ⲧⲉ ⲛ̀ⲥⲉⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ ⲁⲛ",
            "Ⲧⲉⲛⲛⲁϩϯ ⲉ̀ⲟⲩϭⲟⲓⲥ ⲛ̀ⲟⲩⲱⲧ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ ⲡⲓⲙⲓⲥⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲫⲓⲱⲧ ϧⲁϫⲱⲟⲩ ⲛ̀ⲛⲓⲉ̀ⲱⲛ ⲧⲏⲣⲟⲩ",
            "Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ Ⲙⲁⲣⲓⲁ ϯⲃⲱⲕⲓ ⲟⲩⲟϩ ϯⲙⲁⲩ ϫⲉ ⲫⲏⲉⲧ ϧⲉⲛ ⲡⲉⲁ̀ⲙⲏⲣ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲥⲉϩⲱⲥ ⲉ̀ⲣⲟϥ",
            "Ⲁⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ ϧⲉⲛ ⲟⲩⲫⲓ ⲉⲑⲟⲩⲁⲃ ⲙⲁⲧⲟⲩⲃⲟ ⲛ̀ⲛⲉⲧⲉⲛϩⲏⲧ ⲉ̀ⲃⲟⲗ ϩⲁ ⲕⲁⲕⲓⲁ ⲛⲓⲃⲉⲛ",
            "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ"
        ];

        // Extract individual words and clean them
        const wordSet = new Set();
        
        copticTextLines.forEach(line => {
            // Split by spaces and clean each word
            const words = line.split(/\s+/);
            words.forEach(word => {
                // Remove punctuation for word extraction but keep track of it
                const cleanWord = word.replace(/[^\u2C80-\u2CFF\u0300-\u036F]/g, '');
                if (cleanWord.length >= 2) { // Only include words with 2+ characters
                    wordSet.add(cleanWord);
                    // Also add the original word with punctuation if different
                    if (word !== cleanWord && word.length >= 2) {
                        wordSet.add(word);
                    }
                }
            });
        });

        this.copticWords = Array.from(wordSet);
        
        // Sort words by length for difficulty categorization
        this.copticWords.sort((a, b) => a.length - b.length);
        
        console.log(`Extracted ${this.copticWords.length} unique Coptic words`);
    }

    // Categorize words by length for difficulty
    getWordsByDifficulty(difficulty) {
        const totalWords = this.copticWords.length;
        
        switch(difficulty) {
            case 'beginner':
                // Short words (2-5 characters)
                return this.copticWords.filter(word => word.length >= 2 && word.length <= 5);
            case 'intermediate':
                // Medium words (4-8 characters)
                return this.copticWords.filter(word => word.length >= 4 && word.length <= 8);
            case 'advanced':
                // Long words (6+ characters)
                return this.copticWords.filter(word => word.length >= 6);
            default:
                return this.copticWords;
        }
    }

    // Generate random text based on difficulty and settings
    generateRandomText(difficulty) {
        const availableWords = this.getWordsByDifficulty(difficulty);
        
        if (availableWords.length === 0) {
            return {
                coptic: "Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ",
                english: "Let us worship our Savior",
                category: "Default"
            };
        }

        // Determine number of words based on difficulty
        let wordCount;
        switch(difficulty) {
            case 'beginner':
                wordCount = Math.floor(Math.random() * 5) + 3; // 3-7 words
                break;
            case 'intermediate':
                wordCount = Math.floor(Math.random() * 6) + 5; // 5-10 words
                break;
            case 'advanced':
                wordCount = Math.floor(Math.random() * 8) + 8; // 8-15 words
                break;
            default:
                wordCount = 5;
        }

        // Generate random combination of words
        const selectedWords = [];
        for (let i = 0; i < wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            selectedWords.push(availableWords[randomIndex]);
        }

        let copticText = selectedWords.join(' ');

        // Apply settings
        if (!this.settings.includeUppercase) {
            // Convert to lowercase (though Coptic doesn't have traditional case)
            copticText = copticText.toLowerCase();
        }

        if (!this.settings.includePunctuation) {
            // Remove punctuation marks
            copticText = copticText.replace(/[^\u2C80-\u2CFF\u0300-\u036F\s]/g, '');
        }

        return {
            coptic: copticText,
            english: "Random Coptic word combination",
            category: "Generated"
        };
    }

    // Update settings
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    // Get current settings
    getSettings() {
        return { ...this.settings };
    }

    // Get word statistics
    getWordStats() {
        const beginnerWords = this.getWordsByDifficulty('beginner');
        const intermediateWords = this.getWordsByDifficulty('intermediate');
        const advancedWords = this.getWordsByDifficulty('advanced');

        return {
            total: this.copticWords.length,
            beginner: beginnerWords.length,
            intermediate: intermediateWords.length,
            advanced: advancedWords.length,
            averageLength: Math.round(this.copticWords.reduce((sum, word) => sum + word.length, 0) / this.copticWords.length)
        };
    }
}

// Create global instance
const wordGenerator = new CopticWordGenerator();

// Override the existing getRandomText function to use the new generator
function getRandomText(difficulty) {
    // 50% chance to use generated text, 50% chance to use original curated texts
    if (Math.random() < 0.5) {
        return wordGenerator.generateRandomText(difficulty);
    } else {
        // Use original curated texts
        const texts = COPTIC_TEXTS[difficulty];
        return texts[Math.floor(Math.random() * texts.length)];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CopticWordGenerator, wordGenerator };
}