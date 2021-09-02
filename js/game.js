'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const SKY = 'SKY'
const EDGE = '⬛️'
const LIVE = '❤️';
const SHIELD = '🛡️';
const CANDY = '🌟';
const NONE = ' '
const HERO = '🔱';
const HERO_SUPER = '🗼';
const ALIEN = '👽';
const ALIEN_2 = '👾';
const ALIEN_3 = '🐽';
const LASER = '⤊';

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
    isOn: false,
    aliensCount: ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT,
    score: 0,
    super: 3,
    lives: 3,
    shields: 3
}
var gHeroPos

// Called when game loads
function init() {
    gBoard = createBoard(14, 14);
    gGame.isOn = true
    renderAliensCount()
    renderScore()
    renderSuper()
    renderLives()
    renderShields()
    moveAliens()
    renderBoard(gBoard)
}

function restartGame() {
    document.querySelector('.btn-restart').innerText = 'Restart'
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalLaser)
    gIntervalAliens = null
    gGame.aliensCount = ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT;
    gGame.score = 0;
    gGame.super = 3;
    gGame.lives = 3;
    gGame.shields = 3;
    gHero.isShoot = false
    gAliensMoveRight = true
    gIsFreeze = false;
    gLasers = []
    gHero = { pos: { i: 12, j: 6 }, isShoot: false, isSuperMode: false, isShield: false };
    init()
}

// Create and returns the board with aliens on top, ground at bottom
function createBoard(rows, cols) {
    var board = createMat(rows, cols);
    createAliens(board)
    createHero(board)
    return board;
}

function gameOver() {
    gGame.isOn = false
    if (gGame.aliensCount === 0) {
        console.log('win!');
    } else {
        console.log('lose!')
    }
}
// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })
            cellClass += (currCell.type === SKY) ? ' sky' : ' edge';
            cellClass += (gHero.isShield && (currCell.gameObject === HERO || currCell.gameObject === HERO_SUPER)) ? ' shield' : '';
            strHTML += `\t<td class="cell ${cellClass}">\n`;
            switch (currCell.gameObject) {
                case HERO:
                    strHTML += gHero.isSuperMode ? HERO_SUPER : HERO;
                    break;
                case ALIEN:
                    strHTML += ALIEN;
                    break;
                case LASER:
                    strHTML += LASER;
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

// Render the board as a <table> to the page
function renderInitBoard() {
    var strHTML = '';
    for (var i = 0; i < BOARD_SIZE; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < BOARD_SIZE; j++) {
            strHTML += `\t<td class="cell">\n  </td>`;;
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    renderInstructions();
}


function renderScore() {
    document.querySelector('.score').innerText = gGame.score
}

function renderAliensCount() {
    document.querySelector('.aliens-count').innerText = gGame.aliensCount
}

function renderSuper() {
    document.querySelector('.super').innerText = gGame.super
}

function renderLives() {
    var elLives = document.querySelector('.lives');
    var strHTML = '';
    for (var i = 0; i < gGame.lives; i++) {
        strHTML += LIVE;
    }
    elLives.innerText = strHTML;
}

function renderShields() {
    var elShields = document.querySelector('.shields');
    var strHTML = '';
    for (var i = 0; i < gGame.shields; i++) {
        strHTML += SHIELD;
    }
    elShields.innerText = strHTML;
}

function renderInstructions() {
    var elInstruction = document.querySelector('.instructions')
    elInstruction.innerText = `Press 'Enter' to Start/Restart Game.
        Press 'Left & Right' Keys to move your hero.
        Press 'Space' to Fire Laser.
        Press 'n' to blow Aliens around Laser.
        Press 'z' to ...
        Press 'x' to achive Super Mode for shooting more than one Laser each time.`
}
function toggleRestartBtn() {
}
// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}