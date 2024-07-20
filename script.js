// add 3x3 blocks to the container
const gameboard = document.querySelector('.gameboard');
for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.classList.add(`${i}${j}`);
        gameboard.appendChild(block);
    }
}

// set up the array
let ar;
function resetArray() {
    ar = [[], [], []]
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            ar[i][j] = 0;
        }
    }
}
resetArray();

function checkWin(y, x) {
    let initX = x; let initY = y;
    let sumCol = 0;
    let sumRow = 0;

    let sumLeft = 0; // left up (decrement 'y', decrement 'x')
    let sumRight = 0; // right up (decrement 'y', increment 'x')

    let xleft = x; let yleft = y;
    let xright = x; let yright = y;
    for(let i = 0; i < 3; i++) {
        // do column
        sumCol += ar[y][initX];
        y++;
        if(y > 2) { y = 0; }

        // do row
        sumRow += ar[initY][x];
        x++;
        if(x > 2) { x = 0; }

        // do left line
        sumLeft += ar[yleft][xleft];
        xleft--; yleft--;
        if(xleft < 0) { xleft = 2; }
        if(yleft < 0) { yleft = 2; }

        // do right line
        sumRight += ar[yright][xright];
        xright++; yright--;
        if(xright > 2) { xright = 0; }
        if(yright < 0) { yright = 2; }
        
        // say if someone won
        if (sumCol == 3 || sumRow == 3 || sumLeft == 3 || sumRight == 3) { return 1; }
        else if (sumCol == -3 || sumRow == -3 || sumLeft == -3 || sumRight == -3) { return -1 }
    }
}

const announcement = document.querySelector('.announcement');

let moveNum = 1;
function choosePlayer() {
    // add a button for drawing a random player
    const choosePlayerButton = document.createElement('button');
    choosePlayerButton.textContent = "Choose Player";
    announcement.appendChild(choosePlayerButton);

    choosePlayerButton.addEventListener('click', () => {
        // get random number from (1, 2)
        moveNum = Math.floor(Math.random() * 2) + 1;

        choosePlayerButton.remove();
        if(moveNum == 1) { announcement.textContent = "X starts"; }
        else if(moveNum == 2) { announcement.textContent = "O starts"; }
    });
}

choosePlayer();
let inkr;
let moveCount = 0;
let isFinished = false;
// add on click event to all blocks
gameboard.querySelectorAll('.block').forEach(el => el.addEventListener('click', () => {
    if(!el.classList.contains('clicked') && !isFinished){
        // get move
        let move = el.classList[1];
        move = [ move[0], move[1] ];
        console.log(move);
        moveCount++;
        moveNum++;

        // change increment every move
        if (moveNum % 2 != 0) { inkr = -1; }
        else { inkr = 1; }

        if( inkr === 1 ) { el.innerHTML = 'x'; }
        else { el.innerHTML = 'o'; }

        // change array move indices
        ar[move[0]][move[1]] = inkr;
        
        // add classes - 'clicked' to not click it again, and 'value' to check if 'x' or 'o'
        el.classList.add('clicked');

        let win = checkWin(move[0], move[1]);
        if (win === 1) { announcement.textContent = "X Won"; isFinished = true; }
        else if (win === -1) { announcement.textContent = "O Won"; isFinished = true; }

        if (moveCount == 9) {announcement.textContent = "Draw"; isFinished = true; }

        if (isFinished) {
            const resetButton = document.createElement('button');
            resetButton.textContent = "Reset Game";

            const container = document.querySelector('.container');
            container.appendChild(resetButton);

            resetButton.addEventListener('click', () => {
                // delete the button
                resetButton.remove();

                // reset all 'block' attributes to default
                gameboard.querySelectorAll('.block').forEach(el => {
                    el.classList.remove('clicked');
                    el.innerHTML = "";
                })

                // reset all values to default
                moveNum = 1;
                moveCount = 0;
                isFinished = false;
                announcement.textContent = "";
                resetArray();
                choosePlayer();
            });
        }
    }
}));