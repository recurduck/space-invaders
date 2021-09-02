const LASER_SPEED = 80;
var gIntervalLaser;
var gLasers = []
var gHero = { pos: { i: 12, j: 6 }, isShoot: false, isSuperMode: false, isShield: false };

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}

// Handle game keys
function onKeyDown(ev) {
    // console.log(ev);
    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(-1);
            break;
        case 'ArrowRight':
            moveHero(1);
            break;
        case ' ': //Space
            shoot()
            break;
        case 'z':
            shieldHero()
            break;
        case 'x':
            superHero()
            break;
        case 'n':
            blowUp()
            break;
        case 'Enter':
            restartGame()
            break;
    }

}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    var i = gHero.pos.i;
    var j = gHero.pos.j + dir
    if (!gGame.isOn) return
    if (j === 0 || j === BOARD_SIZE - 1) {
        setAliansArea(gBoard)
        shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx, true)
    } else {
        gBoard[gHero.pos.i][gHero.pos.j].gameObject = NONE
        gHero.pos = { i, j: gHero.pos.j + dir }
        gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
        renderBoard(gBoard)
    }
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos, laserIdx) {
    var i = pos.i;
    var j = pos.j;
    if (i < 0) {
        gHero.isShoot = false
        gLasers.splice(laserIdx, 1)
        if (gLasers.length === 0) clearInterval(gIntervalLaser)
    }
    else {
        if (gBoard[i][j].gameObject === ALIEN) {
            handleAlienHit({ i, j })
            gHero.isShoot = false
            gLasers.splice(laserIdx, 1)
            if (gLasers.length === 0) clearInterval(gIntervalLaser)
            return;
        } else {
            setTimeout(() => {
                if (gBoard[i][j].gameObject !== ALIEN) gBoard[i][j].gameObject = NONE;
                renderBoard(gBoard)
            }, LASER_SPEED)
        }
        gBoard[i][j].gameObject = LASER
        renderBoard(gBoard)
        // gLasers[0].pos.i--
    }
}

function blinkLasers() {
    // console.log('blink');
    for (var i = 0; i < gLasers.length; i++) {
        gLasers[i].i--
        blinkLaser(gLasers[i], i)
    }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (!gGame.isOn) return
    if (!gHero.isShoot || gHero.isSuperMode) {
        gHero.isShoot = true
        // console.log('shot laser');
        if (!gIntervalLaser || gLasers.length === 0) {
            gIntervalLaser = setInterval(blinkLasers, LASER_SPEED)
        }
        gLasers.push({ i: gHero.pos.i - 1, j: gHero.pos.j })
        blinkLaser(gLasers[gLasers.length - 1]);
    }
    renderBoard(gBoard)
}

function superHero() {
    if (!gGame.isOn) return
    if (!gHero.isSuperMode) {
        gHero.isSuperMode = true
        setTimeout(() => {
            gHero.isSuperMode = false
        }, 3000)
        gGame.super--
        renderSuper()
    }
}

function shieldHero() {
    if (!gGame.isOn) return
    if (!gHero.isShield) {
        gHero.isShield = true
        setTimeout(() => {
            gHero.isShield = false
        }, 5000)
        gGame.shields--
        renderShields()
    }
}

function blowUp() {
    if (!gGame.isOn) return
    if (!gHero.isShoot) return;
    console.log('blow!!!');
    gHero.isShoot = false
    for (var laser = 0; laser < gLasers.length; laser++) {
        for (var i = gLasers[laser].i - 1; i <= gLasers[laser].i + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue;
            for (var j = gLasers[laser].j - 1; j <= gLasers[laser].j + 1; j++) {
                if (j < 0 || j >= gBoard[i].length)
                    continue;
                if (gBoard[i][j].gameObject !== NONE) {
                    gBoard[i][j].gameObject = NONE
                }
            }
        }
    }
    gLasers = []
    clearInterval(gIntervalLaser)
    console.log(gIntervalLaser);
}

