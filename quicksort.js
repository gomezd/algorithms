#!/usr/bin/env node
var util = require('./util');
var partition = util.partition;
var randomInt = util.randomInt;

function quicksort(arr, left, right) {
    left = left || 0;
    right = right || arr.length - 1;
    if (left >= right) return;
    var pivot = partition(arr, left, right, randomInt(left, right));

    quicksort(arr, left, pivot - 1);
    quicksort(arr, pivot + 1, right);
}

var arr = [2, 4, 0, 9, 19, 8, 4, 0];

console.log(arr);

quicksort(arr);
console.log(arr);
