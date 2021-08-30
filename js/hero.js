const LASER_SPEED = 80;
var gIntervalLaser;
var gLaser = { pos: null }
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

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
    var i = gLaser.pos.i;
    var j = gLaser.pos.j;
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
        gLaser.pos.i--

    }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (!gHero.isShoot) {
        gHero.isShoot = true
        console.log('shot laser');
        gLaser.pos = { i: gHero.pos.i - 1, j: gHero.pos.j };
        blinkLaser({ i: gHero.pos.i - 1, j: gHero.pos.j });
        gIntervalLaser = setInterval(blinkLaser, LASER_SPEED)
    }
    renderBoard(gBoard)
}
