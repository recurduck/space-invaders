const ALIEN_SPEED = 1000;
var gIntervalAliens;
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gAliensMaxRightColumn;
var gAliensMaxLeftColumn;
var gAliensMoveRight = true
var gIsFreeze = false;

function createAliens(board) {
    for (var i = 1; i < ALIENS_ROW_COUNT + 1; i++) {
        for (var j = (BOARD_SIZE - ALIENS_ROW_LENGTH) / 2; j < board[0].length - (BOARD_SIZE - ALIENS_ROW_LENGTH) / 2; j++) {
            board[i][j].gameObject = ALIEN
        }
    }
}

function handleAlienHit(pos) {
    gBoard[pos.i][pos.j].gameObject = NONE;
    gGame.score += 10;
    gGame.aliensCount--;
    renderScore();
    renderAliensCount();
    renderBoard(gBoard)
}

function shiftBoardRight(board, fromI, toI) {
    if (gAliensMaxRightColumn >= gBoard[0].length - 2) {
        shiftBoardDown(board, fromI, toI)
    } else {
        for (var i = toI; i >= fromI; i--) {
            board[i].splice(1,0,{type: SKY, gameObject: NONE})
            board[i].splice(BOARD_SIZE-1,1)
            renderBoard(board)
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (gAliensMaxLeftColumn <= 1) {
        shiftBoardDown(board, fromI, toI)

    } else {
        for (var i = toI; i >= fromI; i--) {
            board[i].splice(BOARD_SIZE-1,0,{type: SKY, gameObject: NONE})
            board[i].splice(1,1)
            renderBoard(board)
        }
    }
}
function shiftBoardDown(board, fromI, toI, forced = false) {
    for (var i = toI; i >= fromI - 1; i--) {
        if (gAliensBottomRowIdx >= board.length - 1) console.log('game over')
        else {
            board[i + 1] = board[i].slice()
            renderBoard(board)
        }
    }
    if(!forced) gAliensMoveRight = !gAliensMoveRight
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reching the hero row - interval stops
function moveAliens() {
    if (!gIntervalAliens) gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
    else {
        setAliansArea(gBoard)
        if (gAliensBottomRowIdx === gHero.pos.i || (gAliensBottomRowIdx === 0 && gAliensTopRowIdx === 0)) {
            gIsFreeze = true
            clearInterval(gIntervalAliens)
            gameOver()
        }
        if (!gIsFreeze) {
            if (gAliensMoveRight) {
                shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            } else {
                shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
        }
    }
}

function setAliansArea(board) {
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 0
    gAliensMaxRightColumn = 0
    gAliensMaxLeftColumn = board[0].length
    gGame.aliensCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                gGame.aliensCount++
                if (!gAliensTopRowIdx) gAliensTopRowIdx = i
                gAliensBottomRowIdx = i
                if (j > gAliensMaxRightColumn) gAliensMaxRightColumn = j
                if (j < gAliensMaxLeftColumn) gAliensMaxLeftColumn = j
            }
        }
    }
}

