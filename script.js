const gameboard = document.querySelector('.gameboard');
for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.classList.add(`${i}${j}`);
        gameboard.appendChild(block);
    }
}



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
    function checkRowsColumns() {
        let initX = x;
        let initY = y;

        let sumCol = 0;
        let sumRow = 0;
        for(let i = 0; i < 3; i++) {
            sumCol += ar[y][initX];
            sumRow += ar[initY][x];

            x++; y++; 
            if(x > 2) { x = 0; }
            if(y > 2) { y = 0; }

            // say if someone won
            if (sumCol == 3 || sumRow == 3) { console.log("1 Won"); break; }
            else if (sumCol == -3 || sumRow == -3) { console.log("-1 Won"); break; }
        }
        x = initX;
        y = initY;
    }

    function checkDiagonal() {
        let sumLeft = 0; // left up (decrement 'y', decrement 'x')
        let sumRight = 0; // right up (decrement 'y', increment 'x')

        let xleft = x; let yleft = y;
        let xright = x; let yright = y;
        for(let i = 0; i < 3; i++) {
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
            if (sumLeft == 3 || sumRight == 3) { console.log("1 Won"); break; }
            else if (sumLeft == -3 || sumRight == -3) { console.log("-1 Won"); break; }
        }
    }

    checkRowsColumns();
    checkDiagonal();
}

while (true) {
    let move = addMove();
    console.log("---------")
    checkWin(move[0], move[1]);
}

