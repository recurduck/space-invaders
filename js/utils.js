'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            if(j===0 || j === COLS-1) row.push({type: EDGE, gameObject: NONE});
            else row.push({type: SKY, gameObject: NONE});
        }
        mat.push(row)
    }
    return mat
}