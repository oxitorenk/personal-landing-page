const phrases = ["CREATE THINGS", "DESIGN THINGS", "DEVELOP THINGS", "MAKE THINGS"];
const dynamicText = document.getElementById('dynamic-text');

const typingConfig = {
    phraseIndex: 0,
    typingSpeed: 150,
    deletingSpeed: 100,
    delayBetweenPhrases: 2000,
    isDeleting: false,
};

function updateText() {
    const currentPhrase = phrases[typingConfig.phraseIndex];
    const currentLength = dynamicText.textContent.length;

    // Update displayed text based on whether we are typing or deleting
    dynamicText.textContent = typingConfig.isDeleting
        ? currentPhrase.substring(0, currentLength - 1) // Remove last character
        : currentPhrase.substring(0, currentLength + 1); // Add next character

    handleTransition(currentLength, currentPhrase.length);
}

function handleTransition(currentLength, fullLength) {
    if (!typingConfig.isDeleting && currentLength === fullLength) {
        // If finished typing the full phrase, start deleting after a delay
        typingConfig.isDeleting = true;
        setTimeout(updateText, typingConfig.delayBetweenPhrases);
    } else if (typingConfig.isDeleting && currentLength === 0) {
        // If finished deleting the phrase, switch to the next phrase
        typingConfig.isDeleting = false;
        typingConfig.phraseIndex = (typingConfig.phraseIndex + 1) % phrases.length;
        setTimeout(updateText, typingConfig.typingSpeed);
    } else {
        const speed = typingConfig.isDeleting ? typingConfig.deletingSpeed : typingConfig.typingSpeed;
        setTimeout(updateText, speed);
    }
}

document.addEventListener('DOMContentLoaded', updateText);