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
        var node = new Node(value);
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


function Trie() {
    this.root = new Node(null);
    this.depth = 0;
}

Trie.prototype = {
    insert: function (word) {
        var self = this;
        var node = self.root;
        console.log('insert ' + word);
        word.split('').forEach(function (chr) {
            if (node.isEmpty()) {
                node = node.addChild(chr);
                return;
            }
            for (var i = 0; i < node.childCount(); i++) {
                var child = node.childAt(i);
                if (child.value === chr) {
                    node = child;
                    return;
                }
            }
            node = node.addChild(chr);
        });
        node.setTerminal(true);
        if (word.length > this.depth) {
            this.depth = word.length;
        }
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
    find: function (word) {
        var node = this.root;
        debugger;
        for (var i = 0; i < word.length; i++) {
            var match = false;
            for (var j = 0; j < node.childCount(); j++) {
                var child = node.childAt(j);
                if (child.value === word.charAt(i)) {
                    match = true;
                    node = child;
                    break;
                }
            }
            if (!match) {
                return null;
            }
        }
        return node;
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

function buildTrie(words) {
    var t = new Trie();
    words.forEach(t.insert, t);
    return t;
}

function dump (obj) {
    console.log(JSON.stringify(obj, null, 2));
}

var words = [
    'image',
    'import',
    'imports',
    'important',
    'impossible',
    'impulse',
    'impulsive',
    'impulsiveness'
];

var t = buildTrie(words);

console.log(t.toString());
for (var i = 1; i <= t.depth; i++) {
    dump(t.getPrefix(i));
}

dump(t.getSmallerThan(5));

console.log(t.contains('imp'));
console.log(t.contains('ima'));

var options = t.complete('imp');
dump(options);

options = t.complete('impu');
dump(options);

console.log(t.findExact('imp'));
console.log(t.findExact('import'));

console.log(t.longestPrefix());

