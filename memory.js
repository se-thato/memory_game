const gameContainer = document.querySelector('.Game');
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createGameBoard() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${letter}</div>
        `;
        gameContainer.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
    });

    cards.onclick = function() {
        this.classList.add('boxOpen');
    };
}

// Initialize the game board
let firstCard, secondCard;
let lockBoard = false;

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

    if (isMatch) {
        // Mark cards as matched and reset the board
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
        checkGameOver();
    } else {
        // Unflip the cards after a short delay
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    checkGameOver();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function checkGameOver() {
    const allCards = document.querySelectorAll('.card');
    const allFlipped = Array.from(allCards).every(card => card.classList.contains('flipped'));

    if (allFlipped) {
        alert('Congratulations! You matched all pairs!');
    }
}

createGameBoard();

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});