#!/usr/bin/env node

function maxSubSum(arr) {
    var currStartIndex = 0,
        currSum,
        res = {
            sum: 0,
            start: 0,
            end: 0,
            sub: []
        };

    if (arr && arr.length) {
        res.sum = arr[0];
        currSum = arr[0];

        for (var i = 1; i < arr.length; i++) {
            currSum = currSum + arr[i];
            if (currSum > res.sum) {
                res.sum = currSum;
                res.end = i;
                res.start = currStartIndex;
            }
            if (currSum < 0) {
                currStartIndex = i + 1;
                currSum = 0;
            }
        }
    }

    res.sub = arr.slice(res.start, res.end + 1);
    return res;
}

function print(obj) {
    console.log(obj);
}

function test(cases) {
    cases.map(maxSubSum).forEach(print);
}

test([
    [-1, 2, 3, -5, 4, -1, 3, -5],
    [],
    [-1, -2, -4, -5],
    [1],
    [-4],
    [1, 2, 3],
    [1, -2, -3]
]);

