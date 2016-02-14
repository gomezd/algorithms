
function Cat(name) {
    this.name = name || 'Cat';
}

Cat.prototype = {
    saySomething: function () {
        return this.name + ' says: meow';
    }
};

var c  = new Cat();
console.log(c.saySomething());

var g = new Cat('Garfield');
console.log(g.saySomething());
