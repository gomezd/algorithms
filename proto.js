

function Cat() {
    this.name = 'Cat';
}

Cat.prototype = {
    saySomething: function () {
        console.log(this.name + ' says: meow');
    }
};

var c  = new Cat();
c.saySomething();


console.log(c.saySomething);
