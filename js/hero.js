const LASER_SPEED = 80;
var gIntervalLaser;
var gLasers = {}
var gHero = { pos: { i: 12, j: 6 }, isShoot: false, isSuperMode: false };

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = HERO
}

// Handle game keys
function onKeyDown(ev) {
    // console.log(ev);
    var i = gHero.pos.i;
    var j = gHero.pos.j;
    switch (ev.key) {
        case 'ArrowLeft':
            moveHero({ i, j: (j - 1 < 0) ? j : j - 1 });
            break;
        case 'ArrowRight':
            moveHero({ i, j: (j + 1 >= gBoard[0].length) ? j : j + 1 });
            break;
        case 'z':
            shoot()
            break;
        case 'x':
            superHero()
            break;
        case 'n':
            blowUp()
            break;
        case 'Enter':
            if(!gGame.isOn) restartGame()
            break;
    }

}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    gBoard[gHero.pos.i][gHero.pos.j] = ''
    gHero.pos = dir
    gBoard[gHero.pos.i][gHero.pos.j] = HERO
    renderBoard(gBoard)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser() {
    var i = gLasers.pos.i;
    var j = gLasers.pos.j;
    if (i < 0) {
        gHero.isShoot = false
        clearInterval(gIntervalLaser)
    }
    else {
        setTimeout(() => {
            gBoard[i][j] = ''
            renderBoard(gBoard)
        }, LASER_SPEED)
        if (gBoard[i][j] === ALIEN) {
            handleAlienHit({ i, j })
            gHero.isShoot = false
            clearInterval(gIntervalLaser);
            return;
        }
        gBoard[i][j] = LASER
        renderBoard(gBoard)
        gLasers.pos.i--
    }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (!gHero.isShoot || gHero.isSuperMode) {
        gHero.isShoot = true
        console.log('shot laser');
        gLasers.pos = { i: gHero.pos.i - 1, j: gHero.pos.j };
        blinkLaser({ i: gHero.pos.i - 1, j: gHero.pos.j });
        gIntervalLaser = setInterval(blinkLaser, LASER_SPEED)
    }
    renderBoard(gBoard)
}

function superHero() {
    if(!gHero.isSuperMode) {
        gHero.isSuperMode = true
        setTimeout(()=>{
            gHero.isSuperMode = false
        }, 3000)
        gGame.super--
        renderSuper()
    }
}

function blowUp() {
    console.log('blow!!!');
    for (var i = gLasers.pos.i - 1; i <= gLasers.pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = gLasers.pos.j - 1; j <= gLasers.pos.j + 1; j++) {
            if (i === gLasers.pos.i && j === gLasers.pos.j)
                continue;
            if (j < 0 || j >= gBoard[i].length)
                continue;
            if (gBoard[i][j] === ALIEN) {
                gBoard[i][j] = ''
            }
        }
    }
    clearInterval(gIntervalLaser)
}