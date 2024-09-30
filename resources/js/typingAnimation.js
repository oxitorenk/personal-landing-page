const phrases = ["CREATE THINGS", "DESIGN THINGS", "DEVELOP THINGS", "MAKE THINGS"];
const dynamicText = document.getElementById('dynamic-text');

const typingConfig = {
    phraseIndex: 0,
    typingSpeed: 150,
    deletingSpeed: 100,
    delayBetweenPhrases: 2000,
    isDeleting: false,
    typing: true,
};

function updateText() {
    const currentPhrase = phrases[typingConfig.phraseIndex];
    const currentLength = dynamicText.textContent.length;

    dynamicText.textContent = typingConfig.isDeleting
        ? currentPhrase.substring(0, currentLength - 1)
        : currentPhrase.substring(0, currentLength + 1);

    handleTransition(currentLength, currentPhrase.length);
}

function handleTransition(currentLength, fullLength) {
    if (!typingConfig.isDeleting && currentLength === fullLength) {
        typingConfig.isDeleting = true;
        setTimeout(updateText, typingConfig.delayBetweenPhrases);
    } else if (typingConfig.isDeleting && currentLength === 0) {
        typingConfig.isDeleting = false;
        typingConfig.phraseIndex = (typingConfig.phraseIndex + 1) % phrases.length;
        setTimeout(updateText, typingConfig.typingSpeed);
    } else {
        const speed = typingConfig.isDeleting ? typingConfig.deletingSpeed : typingConfig.typingSpeed;
        setTimeout(updateText, speed);
    }
}

document.addEventListener('DOMContentLoaded', updateText);