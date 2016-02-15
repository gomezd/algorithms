#!/usr/bin/env node

//private
function _sumMatrix(m) {
    var rows = m.length;
    var cols = m[0].length;

    var M = [[]];

    var rowSum = 0;
    for (var j = 0; j < cols; j++) {
        rowSum += m[0][j];
        M[0][j] = rowSum;
    }

    for (var i = 1; i < rows; i++) {
        var row = [];
        rowSum = 0;
        for (j = 0; j < cols; j++) {
            rowSum += m[i][j];
            row[j] = rowSum + M[i - 1][j];
        }
        M.push(row);
    }

    return M;
}

function _subSum(M, x, y, h, w) {
    var xx = x + h - 1;
    var yy = y + w - 1;

    var totalSum = M[xx][yy];
    var rowSum = (y > 0) ? M[xx][y - 1] : 0;
    var colSum =  (x > 0) ? M[x - 1][yy] : 0;
    var angle = ((x > 0) && (y > 0)) ? M[x - 1][y - 1] : 0

    var res = totalSum - colSum - rowSum + angle;
    console.log('[(%d, %d),(%d, %d)] = %d\t(%d - %d - %d + %d)', x, y, xx, yy, res, totalSum, colSum, rowSum, angle);
    return res;
}

//public
var subSum = (function () {
    var M;

    return function (m, x, y, h, w) {
        if (!M) {
            M =  _sumMatrix(m);
            print(M);
        }
        return _subSum(M, x, y, h, w);
    };
})();

function print(matrix) {
    matrix.forEach(function (row) {
        console.log(row.join('\t'));
    });
    console.log('');
}
// test
var m = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

print(m);

subSum(m, 1, 0, 2, 2);
subSum(m, 0, 0, 1, 3);
subSum(m, 0, 0, 3, 3);
subSum(m, 1, 1, 1, 1);
subSum(m, 1, 1, 1, 2);
