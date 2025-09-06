// Coptic Texts Database - Organized by Difficulty Level
const COPTIC_TEXTS = {
    beginner: [
        {
            id: 1,
            coptic: "Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ",
            english: "Let us worship our Savior",
            category: "Gospel Response"
        },
        {
            id: 2,
            coptic: "Ϣⲗⲏⲗ",
            english: "Let us pray",
            category: "Liturgical"
        },
        {
            id: 3,
            coptic: "Ⲓⲣⲏⲛⲏ ⲡⲁⲥⲓ",
            english: "Peace be with all",
            category: "Liturgical"
        },
        {
            id: 4,
            coptic: "Ⲕⲉ ⲧⲱ ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲟⲩ",
            english: "And with your spirit",
            category: "Response"
        },
        {
            id: 5,
            coptic: "Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ",
            english: "Lord have mercy",
            category: "Response"
        },
        {
            id: 6,
            coptic: "Ⲁⲙⲏⲛ",
            english: "Amen",
            category: "Response"
        },
        {
            id: 7,
            coptic: "Ⲡⲉⲛⲓⲱⲧ ⲉⲧ ϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ",
            english: "Our Father who art in heaven",
            category: "Prayer"
        },
        {
            id: 8,
            coptic: "Ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ",
            english: "Holy, holy, holy",
            category: "Sanctus"
        }
    ],
    
    intermediate: [
        {
            id: 9,
            coptic: "Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲡⲓⲙⲁⲓⲣⲱⲙⲓ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ϫⲉ ⲛ̀ⲑⲟϥ ⲁϥϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ",
            english: "Let us worship our Savior, the Good One and Lover of Mankind, for He had compassion on us",
            category: "Gospel Response"
        },
        {
            id: 10,
            coptic: "Ⲁⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ",
            english: "Intercede on our behalf, O Lady of us all the Theotokos",
            category: "Intercession"
        },
        {
            id: 11,
            coptic: "Ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ",
            english: "Blessed be the Father and the Son and the Holy Spirit",
            category: "Doxology"
        },
        {
            id: 12,
            coptic: "Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ",
            english: "Stand up for prayer",
            category: "Deacon"
        },
        {
            id: 13,
            coptic: "Ⲧⲉⲛϯϩⲟ ⲟⲩⲟϩ ⲧⲉⲛⲧⲱⲃϩ ⲛ̀ⲧⲉⲕⲙⲉⲧⲁ̀ⲅⲁⲑⲟⲥ ⲡⲓⲙⲁⲓⲣⲱⲙⲓ",
            english: "We ask and entreat Your goodness, O Lover of Mankind",
            category: "Litany"
        },
        {
            id: 14,
            coptic: "Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ Ⲙⲁⲣⲓⲁ: ϯⲃⲱⲕⲓ ⲟⲩⲟϩ ϯⲙⲁⲩ: ϫⲉ ⲫⲏⲉⲧ ϧⲉⲛ ⲡⲉⲁ̀ⲙⲏⲣ",
            english: "Rejoice, O Mary, handmaiden and mother, for the angels praise Him who is in your arms",
            category: "Aspasmos"
        }
    ],
    
    advanced: [
        {
            id: 15,
            coptic: "Ⲧⲉⲛⲛⲁϩϯ ⲉ̀ⲟⲩⲛⲟⲩϯ ⲛ̀ⲟⲩⲱⲧ: Ⲫⲛⲟⲩϯ Ⲫⲓⲱⲧ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ: ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲧ̀ⲫⲉ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ: ⲛⲏⲉ̀ⲧⲟⲩⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲏⲉ̀ⲧⲉ ⲛ̀ⲥⲉⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ ⲁⲛ",
            english: "We believe in one God, God the Father, the Pantocrator, Creator of heaven and earth, and of all things seen and unseen",
            category: "Creed"
        },
        {
            id: 16,
            coptic: "Ⲧⲉⲛⲛⲁϩϯ ⲉ̀ⲟⲩϭⲟⲓⲥ ⲛ̀ⲟⲩⲱⲧ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ: ⲡⲓⲙⲓⲥⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲫⲓⲱⲧ ϧⲁϫⲱⲟⲩ ⲛ̀ⲛⲓⲉ̀ⲱⲛ ⲧⲏⲣⲟⲩ",
            english: "We believe in one Lord, Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages",
            category: "Creed"
        },
        {
            id: 17,
            coptic: "Ⲡⲁⲗⲓⲛ ⲟⲛ ⲙⲁⲣⲉⲛϯϩⲟ ⲉ̀Ⲫⲛⲟⲩϯ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ: Ⲫⲓⲱⲧ ⲙ̀Ⲡⲉⲛϭⲟⲓⲥ ⲟⲩⲟϩ Ⲡⲉⲛⲛⲟⲩϯ ⲟⲩⲟϩ ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ",
            english: "Again, let us ask God the Pantocrator, the Father of our Lord, God, and Savior Jesus Christ",
            category: "Litany"
        },
        {
            id: 18,
            coptic: "Ⲫⲛⲏⲃ Ⲡϭⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲓⲛⲓϣϯ ⲡⲓϣⲁⲉ̀ⲛⲉϩ: ⲟⲩⲟϩ ⲉ̀ⲧⲟⲩⲉⲣϣ̀ⲫⲏⲣⲓ ⲙ̀ⲙⲟϥ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ: Ⲫⲏⲉⲧⲁ̀ⲣⲉϩ ⲉ̀ⲧⲉϥⲇⲓⲁⲑⲏⲕⲏ ⲛⲉⲙ ⲡⲉϥⲛⲁⲓ",
            english: "O Master, Lord our God, the Great, the Eternal, who is wondrous in glory; who keeps His covenant and His mercy",
            category: "Fraction"
        },
        {
            id: 19,
            coptic: "Ⲁⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ: ϧⲉⲛ ⲟⲩⲫⲓ ⲉⲑⲟⲩⲁⲃ: ⲙⲁⲧⲟⲩⲃⲟ ⲛ̀ⲛⲉⲧⲉⲛϩⲏⲧ: ⲉ̀ⲃⲟⲗ ϩⲁ ⲕⲁⲕⲓⲁ ⲛⲓⲃⲉⲛ",
            english: "Greet, with a holy kiss, purify your hearts, from every evil thing",
            category: "Aspasmos"
        },
        {
            id: 20,
            coptic: "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ",
            english: "We worship You O Christ, with Your good Father, and the Holy Spirit, for You have come and saved us",
            category: "Aspasmos"
        }
    ]
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    beginner: {
        name: "Beginner",
        description: "Short phrases and common words",
        timeBonus: 1.0,
        accuracyRequirement: 85,
        icon: "fas fa-feather-alt"
    },
    intermediate: {
        name: "Intermediate",
        description: "Medium liturgical passages",
        timeBonus: 1.2,
        accuracyRequirement: 90,
        icon: "fas fa-scroll"
    },
    advanced: {
        name: "Advanced",
        description: "Complex sacred texts",
        timeBonus: 1.5,
        accuracyRequirement: 95,
        icon: "fas fa-monument"
    }
};

// Achievement system
const ACHIEVEMENTS = [
    {
        id: "first_test",
        name: "First Steps",
        description: "Complete your first practice session",
        icon: "fas fa-feather-alt",
        condition: (stats) => stats.testsCompleted >= 1
    },
    {
        id: "speed_demon",
        name: "Speed Typist",
        description: "Achieve 30+ words per minute",
        icon: "fas fa-wind",
        condition: (stats) => stats.bestWPM >= 30
    },
    {
        id: "accuracy_master",
        name: "Precision Expert",
        description: "Achieve 98% accuracy",
        icon: "fas fa-eye",
        condition: (stats) => stats.bestAccuracy >= 98
    },
    {
        id: "coptic_scholar",
        name: "Dedicated Learner",
        description: "Complete 10 advanced practice sessions",
        icon: "fas fa-university",
        condition: (stats) => stats.advancedCompleted >= 10
    },
    {
        id: "perfectionist",
        name: "Perfect Practice",
        description: "Achieve 100% accuracy",
        icon: "fas fa-star",
        condition: (stats) => stats.bestAccuracy >= 100
    },
    {
        id: "lightning_fast",
        name: "Lightning Fast",
        description: "Achieve 50+ words per minute",
        icon: "fas fa-bolt",
        condition: (stats) => stats.bestWPM >= 50
    }
];

// Performance messages based on WPM and accuracy
const PERFORMANCE_MESSAGES = {
    excellent: [
        "Excellent work! Your typing skills are impressive.",
        "Outstanding performance! You've mastered this level beautifully.",
        "Exceptional accuracy and speed. Well done!"
    ],
    good: [
        "Great job! You're making solid progress.",
        "Good work! Your skills are developing nicely.",
        "Well done! Keep up the consistent practice."
    ],
    average: [
        "Nice progress! Practice makes perfect.",
        "You're on the right track. Keep practicing!",
        "Steady improvement! Continue working at it."
    ],
    needsWork: [
        "Good effort! Focus on accuracy first, then speed.",
        "Keep practicing! Every session helps you improve.",
        "Don't worry, everyone learns at their own pace."
    ]
};

// Utility function to get random text by difficulty
function getRandomText(difficulty) {
    const texts = COPTIC_TEXTS[difficulty];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Utility function to get performance message
function getPerformanceMessage(wpm, accuracy) {
    let category;
    
    if (wpm >= 40 && accuracy >= 95) {
        category = 'excellent';
    } else if (wpm >= 25 && accuracy >= 90) {
        category = 'good';
    } else if (wpm >= 15 && accuracy >= 80) {
        category = 'average';
    } else {
        category = 'needsWork';
    }
    
    const messages = PERFORMANCE_MESSAGES[category];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COPTIC_TEXTS,
        DIFFICULTY_SETTINGS,
        ACHIEVEMENTS,
        getRandomText,
        getPerformanceMessage
    };
}