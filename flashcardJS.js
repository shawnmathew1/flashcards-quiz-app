const flashcard = document.querySelector('#flashcard');
const form = document.querySelector("#card-form");
const frontInput = document.querySelector("#front-input");
const backInput = document.querySelector("#back-input");
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const deleteButton = document.querySelector('#delete-button');
const editButton = document.querySelector('#edit-button');
const cardCounterText = document.querySelector('#card-counter-text');
const shuffleButton = document.querySelector('#shuffle-button');


let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

let currentCardIndex = 0;


if (flashcards.length > 0 ) {
    showCard(currentCardIndex);
    updateCardCounter();
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

    updateCardCounter();

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

    updateCardCounter();
});

nextButton.addEventListener('click', () => {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
    }

    updateCardCounter();
});


deleteButton.addEventListener('click', () => {
    if (flashcards.length === 0) return;


    flashcards.splice(currentCardIndex, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
 

    if (currentCardIndex >= flashcards.length) {
        currentCardIndex = flashcards.length - 1;
    } 

    if (flashcards.length > 0) {
        showCard(currentCardIndex);
    } else {
        document.querySelector(".card-front").textContent = "No cards";
        document.querySelector(".card-back").textContent = "";
    }

    updateCardCounter();


});

editButton.addEventListener('click', () => {
    if (!flashcards[currentCardIndex]) {
        alert("No cards exist.");
    }

    const card = flashcards[currentCardIndex];
    let frontInput = prompt("Enter the frontside of the card", card.front);
    let backInput = prompt("Enter the backside of the card", card.back);


    if (frontInput === null || backInput === null || frontInput.trim() === "" || backInput.trim() === "") return;

    flashcards[currentCardIndex] = {
        front: frontInput.trim(),
        back: backInput.trim()
    };



    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    showCard(currentCardIndex);


});

function updateCardCounter() {
    if (flashcards.length === 0) {
        cardCounterText.textContent = `There are no cards currently`;
    } else {
        cardCounterText.textContent = `Card ${currentCardIndex + 1} of ${flashcards.length}`;
    }
    
}


function shuffle() {
    for (let i = flashcards.length; i > 1; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        let temp = flashcards[i - 1];
        flashcards[i - 1] = flashcards[randomIndex];
        flashcards[randomIndex] = temp;
    }

    currentCardIndex = 0;
    showCard(currentCardIndex);
    updateCardCounter();
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    flashcard.classList.remove('is-flipped');

}

shuffleButton.addEventListener('click', () => {
    shuffle();
});