const flashcard = document.querySelector('#flashcard');
const form = document.querySelector("#card-form");
const frontInput = document.querySelector("#front-input");
const backInput = document.querySelector("#back-input");



let flashcards = [];




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

    document.querySelector(".card-front").textContent = newCard.front;
    document.querySelector(".card-back").textContent = newCard.back;

}); 


