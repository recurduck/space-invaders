const LASER_SPEED = 80;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

// creates the hero and place it on board
function createHero(board) {
    console.log('hero');
    board[gHero.pos.i][gHero.pos.j] = HERO
}
// Handle game keys
function onKeyDown(ev) {
    console.log(ev);
    var i = gHero.pos.i;
    var j = gHero.pos.j;
    switch (ev.key) {
        case 'ArrowLeft':
            moveHero({ i, j: j - 1 });
            break;
        case 'ArrowRight':
            moveHero({ i, j: j + 1 });
            break;
    }

}
// Move the hero right (1) or left (-1)
function moveHero(dir) {
    gBoard[gHero.pos.i][gHero.pos.j] = ''
    gHero.pos = dir
    console.log(gHero.pos);
    gBoard[gHero.pos.i][gHero.pos.j] = HERO
    renderBoard(gBoard)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) { }
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() { }
