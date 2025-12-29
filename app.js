const boardElement = document.getElementById('sudoku-board');
const checkBtn = document.getElementById('check-btn');

const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add(`row-${i}`);
        cell.classList.add(`col-${j}`);
        if (puzzle[i][j] !== 0) {
            cell.textContent = puzzle[i][j];
            cell.classList.add('filled');
        }
        boardElement.appendChild(cell);
    }
}

boardElement.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('cell') && !target.classList.contains('filled')) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        input.value = target.textContent;
        target.textContent = '';
        target.appendChild(input);
        input.focus();

        input.addEventListener('blur', () => {
            target.textContent = input.value;
        });
    }
});

checkBtn.addEventListener('click', checkSolution);

function getBoardState() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.querySelector(`.row-${i}.col-${j}`);
            row.push(parseInt(cell.textContent) || 0);
        }
        board.push(row);
    }
    return board;
}

function checkSolution() {
    const board = getBoardState();

    // Check for empty cells
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                alert('Please fill all cells before checking the solution.');
                return;
            }
        }
    }

    // Check rows
    for (let i = 0; i < 9; i++) {
        const row = new Set();
        for (let j = 0; j < 9; j++) {
            if (row.has(board[i][j])) {
                alert('Incorrect solution: Duplicate number in a row.');
                return;
            }
            row.add(board[i][j]);
        }
    }

    // Check columns
    for (let j = 0; j < 9; j++) {
        const col = new Set();
        for (let i = 0; i < 9; i++) {
            if (col.has(board[i][j])) {
                alert('Incorrect solution: Duplicate number in a column.');
                return;
            }
            col.add(board[i][j]);
        }
    }

    // Check 3x3 subgrids
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
            const subgrid = new Set();
            for (let i = boxRow; i < boxRow + 3; i++) {
                for (let j = boxCol; j < boxCol + 3; j++) {
                    if (subgrid.has(board[i][j])) {
                        alert('Incorrect solution: Duplicate number in a 3x3 subgrid.');
                        return;
                    }
                    subgrid.add(board[i][j]);
                }
            }
        }
    }

    alert('Congratulations! You have solved the Sudoku!');
}
