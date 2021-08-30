const ALIEN_SPEED = 1000;
var gIntervalAliens;
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gAliensMaxRightColumn;
var gAliensMaxLeftColumn;
var gAliensMoveRight = true
var gIsFreeze = false;

function handleAlienHit(pos) {
    console.log('alien hited!')
}

function shiftBoardRight(board, fromI, toI) {
    if (gAliensMaxRightColumn >= gBoard[0].length - 1) {
        console.log('shift down from right');
        shiftBoardDown(board, fromI, toI)
    } else {
        for (var i = toI; i >= fromI; i--) {
            board[i].unshift('')
            board[i].pop()
            renderBoard(board)
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (gAliensMaxLeftColumn <= 0) {
        console.log('shift down from left');
        shiftBoardDown(board, fromI, toI)

    } else {
        for (var i = toI; i > fromI; i--) {
            board[i].push('')
            board[i].shift()
            renderBoard(board)
        }
    }
}
function shiftBoardDown(board, fromI, toI) {
    console.log(fromI, toI, i >= fromI);
    for (var i = toI; i > fromI; i--) {
        if (gAliensBottomRowIdx >= board.length - 1) console.log('game over')
        else {
            console.log(board[i] , board[i + 1]);
            board[i + 1] = board[i]
            renderBoard(board)
        }
    }
    gAliensMoveRight = !gAliensMoveRight
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reching the hero row - interval stops
function moveAliens() {
    if (!gIntervalAliens) gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
    else {
        if (!gIsFreeze) {
            setAliansArea(gBoard)
            if (gAliensMoveRight) {
                shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            } else {
                shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }

            // console.log(gBoard[i])
        }
    }
}

function setAliansArea(board) {
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 0
    gAliensMaxRightColumn = 0
    gAliensMaxLeftColumn = board[0].length
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === ALIEN) {
                if (!gAliensTopRowIdx) gAliensTopRowIdx = i
                gAliensBottomRowIdx = i
                if (j > gAliensMaxRightColumn) gAliensMaxRightColumn = j
                if (j < gAliensMaxLeftColumn) gAliensMaxLeftColumn = j
            }
        }
    }
}
