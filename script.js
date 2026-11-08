const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let A = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let gameOver = false;

// jeetne ki 8 combinations (rows, columns, diagonals)
const wins = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWin(t) {
  return wins.find(w => w.every(i => A[i] === t));
}

function checkDraw() {
  return A.every(c => c !== '');
}

function playerName(t) {
  return t === 'X' ? 'Player1 [X]' : 'Player2 [O]';
}

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    if (gameOver || A[i] !== '') return;   // pehle se bhari jagah

    A[i] = turn;
    cell.textContent = turn;
    cell.classList.add(turn);

    const line = checkWin(turn);
    if (line) {
      status.textContent = playerName(turn) + ' jeet gaya!';
      line.forEach(k => cells[k].classList.add('win'));
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      status.textContent = 'Game draw ho gayi!';
      gameOver = true;
      return;
    }

    turn = (turn === 'X') ? 'O' : 'X';
    status.textContent = playerName(turn) + ' ki bari';
  });
});

restartBtn.addEventListener('click', () => {
  A = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  gameOver = false;
  status.textContent = 'Player1 [X] ki bari';
  cells.forEach(c => {
    c.textContent = '';
    c.className = 'cell';
  });
});