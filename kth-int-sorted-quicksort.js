
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function partition(arr, left, right, pivotIndex) {
    var pivot = arr[pivotIndex];
    var swapIndex = left;
    swap(arr, pivotIndex, right);
    for(var i = left; i < right; i++) {
        if (arr[i] < pivot) {
            swap(arr, i, swapIndex);
            swapIndex++;
        }
    }
    swap(arr, swapIndex, right);
    return swapIndex;
}

function swap(arr, i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}

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

function quicksort(arr, left, right) {
    left = left || 0;
    right = right || arr.length - 1;
    if (left >= right) return;
    var pivot = partition(arr, left, right, randomInt(left, right));

    quicksort(arr, left, pivot - 1);
    quicksort(arr, pivot + 1, right);
}

var arr = [2, 4, 0, 9, 19, 8, 4, 0];
//var arr = [3, 5, 7, 2, 8, 1, 1, 4, 9, 7, 6, 3, 2, 5, 8, 16, 32, 54, 99, 0];
var k = 3;
//var pivotIndex = randomInt(left, right);
//pivotIndex = partition(arr, left, right, pivotIndex);

console.log(arr);
//console.log(pivotIndex);
//console.log(arr[pivotIndex]);

//var kth = findKth(arr, k);
//console.log(kth);
quicksort(arr);
console.log(arr);
