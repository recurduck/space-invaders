const LASER_SPEED = 80;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = HERO
}
// Handle game keys
function onKeyDown(ev) {
    console.log(ev);
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
function blinkLaser(pos) {
    if (pos.i - 1 < 0) gHero.isShoot = false
    else {
        cell = gBoard[pos.i - 1][pos.j];
        switch (cell) {
            case ALIEN:
                gBoard[pos.i - 1][pos.j] = ''
                gHero.isShoot = false
                handleAlienHit({ i: pos.i - 1, j: pos.j })
                break;
            default:
                gBoard[pos.i - 1][pos.j] = LASER
                setTimeout(shoot, 1000, { i: pos.i - 1, j: pos.j })
        }
    }
}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
    if (pos) {
        gBoard[pos.i][pos.j] = ''
        blinkLaser(pos)
        renderBoard(gBoard)
    } else if (!gHero.isShoot) {
        gHero.isShoot = true
        console.log('shot laser');
        blinkLaser({ i: gHero.pos.i, j: gHero.pos.j })
    }
    renderBoard(gBoard)
}
