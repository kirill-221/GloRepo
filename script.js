'use strict';
let title = prompt('Как называется ваш проект?');
let screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные'
);
let screenPrice = +prompt('Сколько будет стоить данная работа?', '10000');
let adaptive = prompt('Нужен ли адаптив на сайте?', 'true / false');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 2;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);
let percentIntermediary = fullPrice * (rollback / 100);
let servicePercentPrice = fullPrice - percentIntermediary;
console.log(Math.ceil(servicePercentPrice));

if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log('Скидка не предусмотрена');
} else if (fullPrice < 0) {
    console.log('Что то пошло не так');
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(screenPrice);
console.log(fullPrice);

console.log(screens.toLowerCase, screens.split());

console.log(fullPrice * (rollback / 100));
