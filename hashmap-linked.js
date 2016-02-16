'use strict';

class LinkedEntry {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
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
        let entry = table[hash];

        if (entry === undefined) {
            table[hash] = new LinkedEntry(key, val);
            return;
        }

        while (entry.next !== null) {
            entry = entry.next;
        }
        if (entry.key === key) {
            entry.val = val;
        } else {
            entry.next = new LinkedEntry(key, val);
        }
    }

    get(key) {
        const table = this.table;
        let hash = this._hashFunc(key);
        let entry = table[hash];

        if (entry === undefined) {
            return undefined;
        }

        while (entry !== undefined && entry.key !== key) {
            entry = entry.next;
        }
        return entry && entry.val || undefined;
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
