
// Generate M according to the given matrix
function generateM(matrix, m, n) {
    var M = [],
        i, j;

    for (i = 0; i < m; i++) {
        M.push([]);
    }

    // fill the first line
    M[0][0] = matrix[0][0];
    for (j = 1; j < n; j++) {
        M[0][j] = M[0][j-1] + matrix[0][j];
    }
    for (i = 1; i < m; i++) {
        var line_sum = 0
        for (j = 0; j < n; j++) {
            line_sum += matrix[i][j];
            M[i][j] = M[i-1][j] + line_sum;
        }
    }
    return M;
}

// Get sum of the sub-matrix using M
function subSum(M, m, n, x, y, h, w) {
    if ( (x < 0) || (x > m) || (y < 0) || (y > n) ) {
        console.error("Error: Invalid [x,y] - (0<=x<%d, 0<=y<%d).", m, n);
        return -1
    }
    if ( (h <= 0) || (w <= 0) ) {
        console.error("Error: Invalid [h,w] - (h>0,w>0).");
        return -1;
    }
    var xx = x + h - 1,
        yy = y + w - 1,
        d = M[xx][yy],
        b = ((x - 1) < 0) ? 0 : M[x - 1][yy],
        c = ((y - 1) < 0) ? 0 : M[xx][y - 1],
        a = ( ((x - 1) < 0) || ((y - 1) < 0) ) ? 0 : M[x - 1][y - 1];

    console.log("(x:%d, y:%d)(xx:%d, yy:%d) [h:%d, w:%d] = %d - %d - %d + %d", x, y, xx, yy, h, w, d, b, c, a);
    return d - b - c + a;
}

function print(m) {
    m.forEach(function (r) {
        console.log(r.join("\t"));
    });
    console.log("\n");
}


function main() {
    var m = 3,
        n = 3,
        O = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

    print(O);

    var M = generateM(O, m, n);

    print (M);

    var r = subSum(M, m, n, 0, 0, 1, 3);
    console.log(r);

    r = subSum(M, m, n, 1, 1, 2, 2);
    console.log(r);

    r = subSum(M, m, n, 1, 0, 2, 2);
    console.log(r);

    r = subSum(M, m, n, 0, 1, 2, 2);
    console.log(r);

    r = subSum(M, m, n, 2, 2, 1, 1);
    console.log(r);
}

main();


