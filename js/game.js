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
    gBoard = createBoard(14, 14);
    console.table(gBoard)
    renderBoard(gBoard)
}
// Create and returns the board with aliens on top, ground at bottom
function createBoard(rows, cols) {
    var board = createMat(rows, cols);
    for (var j = 2; j < board[0].length-2; j++) {
        board[0][j] = ALIEN
    }
    createHero(board)
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })
			// if (currCell.type === FLOOR) cellClass += ' floor';
			// else if (currCell.type === WALL) cellClass += ' wall';
			strHTML += `\t<td class="cell ${cellClass}">\n`;
			switch(currCell) {
                case HERO: 
                    strHTML += HERO; 
                    break;
                case ALIEN: 
                    strHTML += ALIEN;
                    break;
                default:
                    strHTML += ' ';
            }
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}