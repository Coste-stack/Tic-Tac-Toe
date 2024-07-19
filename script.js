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
    function checkColumns() {
        let initX = x;
        let initY = y;

        let sum = 0;
        for(let i = 0; i < 3; i++) {
            sum += ar[y][x];

            y++;
            if(y > 2) { y = 0; }

            // say if someone won
            if (sum == 3) { console.log("1 Won"); break; }
            else if (sum == -3) { console.log("-1 Won"); break; }
        }
        x = initX;
        y = initY;
    }

    function checkRows() {
        let initX = x;
        let initY = y;
        
        let sum = 0;
        for(let i = 0; i < 3; i++) {
            sum += ar[y][x];

            x++;
            if(x > 2) { x = 0; }

            // say if someone won
            if (sum == 3) { console.log("1 Won"); break; }
            else if (sum == -3) { console.log("-1 Won"); break; }
        }
        x = initX;
        y = initY;
    }
    checkColumns();
    checkRows();
}

while (true) {
    let move = addMove();
    console.log("---------")
    checkWin(move[0], move[1]);
}
