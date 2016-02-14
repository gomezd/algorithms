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

module.exports = {
    randomInt: randomInt,
    partition: partition,
    swap: swap
};
