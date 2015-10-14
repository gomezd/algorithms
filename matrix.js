
var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var sums = {};

function print(m) {
    m.forEach(function (r) {
        console.log(r.join("\t"));
    });
    console.log("\n");
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return "(" + this.x + "," + this.y + ")";
}

function sum(p1, p2, m) {
    var i, j, s = 0;
    for (i = p1.x; i <= p2.x; i++) {
        for (j = p1.y; j <= p2.y; j++) {
            s += m[i][j];
        }
    }
    return s;
}

function sub(m, N, M, w, h) {
    var x1, y1;
    for (x1 = 0; x1 <= N - w; x1++) {
        for (y1 = 0; y1 <= M - h; y1++) {
            var p1 = new Point(x1, y1),
                p2 = new Point(x1 + w - 1, y1 + h -1);
            sums[[p1, p2]] = {
                p1: p1,
                p2: p2,
                sum: sum(p1, p2, m)
            };
        }
    }
}

function precompute(m, N, M) {
    var i, j;
    for (i = 1; i <= N; i ++) {
        for (j = 1; j <= M; j++) {
            sub(m, N, M, i, j);
        }
    }
    console.log("Pre computed " + Object.keys(sums).length + " rectangles:\n");
    Object.keys(sums).forEach(function (k, i) {
        var s = sums[k];
        console.log((i+1) +":\t[" + s.p1 + "," + s.p2 + "] = [" + m[s.p1.x][s.p1.y] + "," + m[s.p2.x][s.p2.y] + "] => " + s.sum);
    });
    console.log("\n");
}

function query(x1, y1, x2, y2) {
    var p1 = new Point(x1, y1),
        p2 = new Point(x2, y2),
        res = sums[[p1, p2]].sum;
    console.log("QUERY[" + p1 + "," + p2 + "] = " + res + "\n");
}

function rectanglesIncluding(x, y) {
    var res = [];
    for (var k in sums) {
        var s = sums[k];
        if ((s.p1.x <= x) && (s.p1.y <= y) && (s.p2.x >= x) && (s.p2.y >= y)) {
            res.push([s.p1, s.p2]);
        }
    }
    console.log('Included rectangles: ' + res.length + "\n" + res.map(function (v) { return "[" + v + "] => " + sums[v].sum;}).join("\n") + "\n");
    return res;
}

function update(m, x, y, v) {
    console.log("UPDATE[" + x + ", " + y + "] => " + v + "\n");
    m[x][y] = v;
    var recs = rectanglesIncluding(x, y);
    recs.forEach(function (r) {
        sums[r].sum = sum(r[0], r[1], m);
    });
}

function sum2(x1, y1, x2, y2, m) {
    return m[x2][y2] - m[x1][y2] - m[x2][y1] + m[x1][y1];
}

function main () {
    print(matrix);
    precompute(matrix, 3, 3);

    query(0, 0, 0, 2);
    query(0, 1, 1, 2);
    query(0, 0, 2, 2);

    update(matrix, 0, 1, 3);
    print(matrix);

    query(0, 0, 0, 2);
    query(0, 1, 1, 2);
    query(0, 0, 2, 2);

    update(matrix, 2, 2, 10);
    print(matrix);

    query(0, 0, 0, 2);
    query(0, 1, 1, 2);
    query(0, 0, 2, 2);
}

main();
