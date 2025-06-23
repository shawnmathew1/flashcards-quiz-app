const flashcard = document.querySelector('#flashcard');
const form = document.querySelector("#card-form");
const frontInput = document.querySelector("#front-input");
const backInput = document.querySelector("#back-input");
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');



let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

let currentCardIndex = 0;


if (flashcards.length > 0 ) {
    showCard(currentCardIndex);
}





flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
});



form.addEventListener('submit', function(e) {
    e.preventDefault();

    const frontInputValue = frontInput.value.trim();
    const backInputValue = backInput.value.trim();

    if (frontInputValue === "" || backInputValue === "") return; 

    

    const newCard = {
        front: frontInputValue,
        back: backInputValue
    }


    flashcards.push(newCard);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));


    frontInput.value = "";
    backInput.value = "";

    currentCardIndex = flashcards.length - 1;
    showCard(currentCardIndex);

}); 


/* Navigation between multiple cards */

function showCard(index) {
    const card = flashcards[index];
    document.querySelector(".card-front").textContent = card.front;
    document.querySelector(".card-back").textContent = card.back;

}

prevButton.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard(currentCardIndex);
    }
});

nextButton.addEventListener('click', () => {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
    }
});