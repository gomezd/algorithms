function Node(value) {
    this.value = value;
    this.children = [];
    this.terminal = false;
}

Node.prototype = {
    childCount: function () {
        return this.children.length;
    },
    childAt: function (index) {
        return this.children[index];
    },
    addChild: function (value) {
        var node = (typeof value === 'string') ? new Node(value) : value;
        this.children.push(node);
        return node;
    },
    isEmpty: function () {
        return this.children.length === 0;
    },
    isTerminal: function () {
        return this.terminal;
    },
    setTerminal: function(isTerminal) {
        this.terminal = isTerminal;
    },
    forEach: function (callback) {
        this.children.forEach(callback);
    }
};


function CompressedTrie() {
    this.root = new Node(null);
    this.depth = 0;
}

CompressedTrie.prototype = {
    insert: function (word) {
        var self = this;
        debugger;

        function insertInto(node, suffix) {
            for (var i = 1; i <= suffix.length; i++) {
                var prefix = suffix.substring(0, i);
                var child = self._find(node, prefix);
                if (child) {
                    insertInto(child, suffix.substring(i));
                    return;
                }
            }
        }

        insertInto(this.root, word);
    },

    toString: function () {
        var out = '';
        var level = 0;

        function printChild(node, level) {
            level = level || 0;
            for (var i = 0; i < level - 1; i++) {
                out += '.';
            }
            out += node.value + (node.isTerminal ? '*' : '') + '\n';
            node.forEach(function (child) {
                printChild(child, level + 1);
            });
        }

        this.root.forEach(printChild);
        return out;
    },
    getPrefix: function (length) {
        var out = [];

        function getChild(node, level, prefix) {
            prefix += node.value;

            if (level === length - 1) {
                out.push(prefix);
                return;
            }
            if (level < length) {
                node.forEach(function (child) {
                    getChild(child, level + 1, prefix);
                });
            }
        }

        this.root.forEach(function (child) {
            getChild(child, 0, '');
        });
        return out;
    },
    getSmallerThan: function (length) {
        var out = [];

        function getChild(node, level, prefix) {
            if (level === length - 1) {
                return;
            }

            prefix += node.value;
            out.push(prefix);

            if (level < length) {
                node.forEach(function (child) {
                    getChild(child, level + 1, prefix);
                });
            }
        }

        this.root.forEach(function (child) {
            getChild(child, 0, '');
        });
        return out;
    },
    _findChild: function (node, value) {
        for (var i = 0; i < node.childCount(); i++) {
            var child = node.childAt(i);
            if (child.value === value) {
                return child;
            }
        }
        return null;
    },
    _find: function (node, word) {
        var sufix = word;

        while (sufix) {
            for (var i = 1; i <= sufix.length; i++) {
                var prefix = sufix.substring(0, i);
                var child = this._findChild(node, prefix);
                if (child) {
                    node = child;
                    sufix = sufix.substring(i);
                    break;
                }
                if (i === sufix.length) {
                    return false;
                }
            }
        }
        return node;
    },
    find: function (word) {
        return this._find(this.root, word);
    },
    findExact: function (word) {
        var node = this.find(word);
        return node.isTerminal();
    },
    contains: function (word) {
        var node = this.find(word);
        return node !== null;
    },
    complete: function (prefix) {
        var node = this.find(prefix);
        var res = [];

        function traverse(node, prefix, res) {
            if (node.isEmpty()) {
                res.push(prefix);
                return;
            }
            node.forEach(function (child) {
                traverse(child, prefix + child.value, res);
            });
        }

        if (node) {
            traverse(node, prefix, res);
        }
        return res;
    },
    longestPrefix: function () {
        var node = this.root;
        var prefix = '';

        while (node) {
            if (node.childCount() === 1) {
                node = node.childAt(0);
                prefix += node.value;
            } else {
                node = null;
            }
        }
        return prefix;
    }
};

function buildCompressedTrie(words) {
    var t = new CompressedTrie();
    words.forEach(t.insert, t);
    return t;
}

function dump (obj) {
    console.log(JSON.stringify(obj, null, 2));
}

var words = [
    'si',
    'simio',
    'simion',
    'simios'
];

// var t = new CompressedTrie();
// var si = new Node("sim");
// var on = new Node("on");
// si.addChild("io");
// si.addChild(on);
// on.addChild("ete");
// on.addChild("tas");
// t.root.addChild(si);

var t = buildCompressedTrie(words);
dump(t);

// console.log(t.find("simio"));
// console.log(t.find("simios"));
console.log(t.find("simontas"));

// console.log(t.toString());
// for (var i = 1; i <= t.depth; i++) {
//     dump(t.getPrefix(i));
// }

// dump(t.getSmallerThan(5));

// console.log(t.contains('imp'));
// console.log(t.contains('ima'));

// var options = t.complete('imp');
// dump(options);

// options = t.complete('impu');
// dump(options);

// console.log(t.findExact('imp'));
// console.log(t.findExact('import'));

// console.log(t.longestPrefix());

