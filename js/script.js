class First {
    hello() {
        console.log('Привет я метод родителя!');
    }
}
class Second extends First {
    test() {
        super.hello();
        console.log('А я наследуемый метод!');
    }
}

const first = new First('Vlad', 23);

first.hello();
console.log(first);

const second = new Second();
second.test();
