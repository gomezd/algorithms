'use strict';

class Entry {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

const DEFAULT_TABLE_SIZE = 128;

class HashMap {
    constructor(size) {
        this.size = size || DEFAULT_TABLE_SIZE;
        this.table = new Array(size);
    }

    _hashFunc(key) {
        return (key % this.size);
    }

    put(key, val) {
        const table = this.table;
        let hash = this._hashFunc(key);
        while (table[hash] !== undefined && table[hash].key !== key) {
            hash = (hash + 1) % this.size;
        }
        table[hash] = new Entry(key, val);
    }

    get(key) {
        const table = this.table;
        let hash = this._hashFunc(key);
        while (table[hash] !== undefined && table[hash].key !== key) {
            hash = this._hashFunc(hash + 1);
        }
        return table[hash] && table[hash].val || undefined;
    }
}

var m = new HashMap();
m.put(1, 'foo');
m.put(1, 'bar');
m.put(2, 'baz');
m.put(3, 'quux');

console.log(m.get(1));
console.log(m.get(2));
console.log(m.get(3));
