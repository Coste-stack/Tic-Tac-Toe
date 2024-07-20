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

// add on click event to all blocks
gameboard.querySelectorAll('.block').forEach(el => el.addEventListener('click', () => {
    if(!el.classList.contains('clicked')){
        el.classList.add('clicked');
        el.style.backgroundColor = "red";
        el.dataset.value = 1;
    }
}));

function printArray(ar) {
    for(let i = 0; i < 3; i++) {
        let line = "";
        for(let j = 0; j < 3; j++) {
            line += ar[i][j].toString();
        }
        console.log(line);
    }
}

// set up the array
ar = [[], [], []]
for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        ar[i][j] = 0;
    }
}

let moveNum = 0;
let inkr;
function addMove() {
    moveNum++;
    // change increment every move
    if (moveNum % 2 != 0) { inkr = -1; }
    else { inkr = 1; }

    // ask for move
    let move = prompt();
    //console.log(move[0], "-", move[1]);
    
    // change array move indices
    ar[move[0]][move[1]] = inkr;
    printArray(ar);

    return move;
}

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

let moveCount = 0;
while (true) {
    let move = addMove();
    moveCount++;
    
    console.log("---------")
    let win = checkWin(move[0], move[1]);
    if (win === 1) { console.log("1 Won"); break; }
    else if (win === -1) { console.log("-1 Won"); break; }

    if (moveCount == 9) {console.log("Draw"); break; }
}

