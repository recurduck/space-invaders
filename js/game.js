'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
    isOn: false,
    aliensCount: 0
}
var gHeroPos

// Called when game loads
function init() {
    console.log('init');
    gHeroPos = { i: 12, j: 5 };
    gBoard = createBoard(14, 14);

    console.table(gBoard)
}
// Create and returns the board with aliens on top, ground at bottom
function createBoard(rows, cols) {
    var board = createMat(rows, cols);
    for (var j = 2; j < board[0].length-2; j++) {
        board[0][j] = ALIEN
    }

        return board;

}

// Render the board as a <table> to the page
function renderBoard(board) { }
