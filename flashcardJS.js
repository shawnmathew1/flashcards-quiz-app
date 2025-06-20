const flashcard = document.querySelector('#flashcard');

flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
});

