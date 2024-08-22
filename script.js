const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeModal = document.getElementById('closeModal');
const playAgainButton = document.getElementById('playAgainButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        showWinner(currentPlayer);
        return;
    }

    if (!board.includes('')) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function showWinner(player) {
    winnerMessage.textContent = `Congratulations! Player ${player} wins!`;
    winnerModal.style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });

    winnerModal.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closeModal.addEventListener('click', () => {
    winnerModal.style.display = 'none';
});
playAgainButton.addEventListener('click', resetGame);
