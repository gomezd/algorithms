'use strict';

class BaseHeap {
    constructor() {
        this.elements = [];
    }

    get size() {
        return this.elements.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    insert(val) {
        let insertIdx = this.size;
        this.elements.push(val);
        this._siftUp(insertIdx);
    }

    remove() {
        if (this.isEmpty()) {
            throw new Error('heap is empty');
        }

        let e = this.elements;
        let min = e[0];
        let last = e.pop();

        if (e.length > 0) {
            e[0] = last;
            this._siftDown(0);
        }

        return min;
    }

    get _root() {
        if (this.isEmpty()) {
            throw new Error('heap is empty');
        }
        return this.elements[0];
    }

    _siftUp(idx) {
        throw new Error('must be overriden');
    }

    _siftDown(idx) {
        throw new Error('must be overriden');
    }

    _swap(i, j) {
        let e = this.elements;
        let tmp = e[i];
        e[i] = e[j];
        e[j] = tmp;
    }

    _left(idx) {
        return 2 * idx + 1;
    }

    _right(idx) {
        return 2 * idx + 2;
    }

    _parent(idx) {
        return Math.floor((idx - 1) / 2);
    }
}

class MaxHeap extends BaseHeap {
    get max() {
        return this._root;
    }

    _siftUp(idx) {
        if (idx > 0) {
            let e = this.elements;
            let p = this._parent(idx);
            if (e[p] < e[idx]) {
                this._swap(p, idx);
                this._siftUp(p);
            }
        }
    }

    _siftDown(idx) {
        let e = this.elements;
        let l = this._left(idx);
        let r = this._right(idx);
        let s = e.length;
        let minIndex;

        if (r >= s) {
            if (l >= s) {
                return
            } else {
                minIndex = l;
            }
        } else {
            minIndex = (e[l] >= e[r]) ? l : r;
        }

        if (e[idx] < e[minIndex]) {
            this._swap(idx, minIndex);
            this._siftDown(minIndex);
        }
    }
}

class MinHeap extends BaseHeap {
    get min() {
        return this._root;
    }

    _siftUp(idx) {
        if (idx > 0) {
            let e = this.elements;
            let p = this._parent(idx);
            if (e[p] > e[idx]) {
                this._swap(p, idx);
                this._siftUp(p);
            }
        }
    }

    _siftDown(idx) {
        let e = this.elements;
        let l = this._left(idx);
        let r = this._right(idx);
        let s = e.length;
        let minIndex;

        if (r >= s) {
            if (l >= s) {
                return
            } else {
                minIndex = l;
            }
        } else {
            minIndex = (e[l] <= e[r]) ? l : r;
        }

        if (e[idx] > e[minIndex]) {
            this._swap(idx, minIndex);
            this._siftDown(minIndex);
        }
    }
}

// --- test ---
console.log('--- max heap ---');
var m = new MaxHeap();

m.insert(7);
m.insert(4);
m.insert(9);
m.insert(3);
console.log(`max: ${m.max}`);

m.insert(10);
console.log(`max: ${m.max}`);

console.log(`removed: ${m.remove()}`);
console.log(`max: ${m.max}`);

console.log(`removed: ${m.remove()}`);
console.log(`max: ${m.max}`);

console.log('--- min heap ---');
m = new MinHeap();

m.insert(7);
m.insert(4);
m.insert(9);
m.insert(3);
console.log(`min: ${m.min}`);

m.insert(1);
console.log(`min: ${m.min}`);

console.log(`removed: ${m.remove()}`);
console.log(`min: ${m.min}`);

console.log(`removed: ${m.remove()}`);
console.log(`min: ${m.min}`);
