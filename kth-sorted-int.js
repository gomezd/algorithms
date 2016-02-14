#!/usr/bin/env node
var util = require('./util');
var randomInt = util.randomInt;
var partition = util.partition;

function findKth(arr, k, left, right) {
    left = left  || 0;
    right = right || arr.length - 1;

    if (k < 0 || k > right) {
        throw "k:" + k + " out of range [" + (left + 1) + ", " + (right + 1) + "]";
    }

    var kidx = k - 1;
    var pivotIndex = partition(arr, left, right, randomInt(left, right));
    if (pivotIndex === kidx) {
        return arr[kidx];
    }
    if (pivotIndex > kidx) {
        return findKth(arr, k, left, pivotIndex - 1);
    }
    return findKth(arr, k, pivotIndex + 1, right);
}

var arr = [2, 4, 0, 9, 19, 8, 4, 0];
var k = 3;
var kth = findKth(arr, k);

console.log(kth);
