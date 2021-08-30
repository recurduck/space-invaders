const ALIEN_SPEED = 500;
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

function shiftBoardRight(board, fromI, toI) { }
function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reching the hero row - interval stops
function moveAliens() {
    if (!gIntervalAliens) gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
    else {
        setAliansArea(gBoard)
        for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
            if(gAliensMoveRight) {
                shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            } else {
                shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
            // gBoard[i].unshift('')
            // gBoard[i].pop()
            // console.log(gBoard[i])
        }
    }
}

function setAliansArea(board) {
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 0
    gAliensMaxRightColumn = 0
    gAliensMaxLeftColumn = board[0].length
    for (var i = 0; i > board.length; i++) {
        for (var j = 0; j > board.length; j++) {
            if (board[i][j] === ALIEN) {
                if (!gAliensTopRowIdx) gAliensTopRowIdx = i
                gAliensBottomRowIdx = i
                if(j > gAliensMaxRightColumn) gAliensMaxRightColumn = j
                if(j < gAliensMaxLeftColumn) gAliensMaxLeftColumn = j
            }
        }
    }
}
