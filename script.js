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
let servicePercentPrice = fullPrice * (rollback / 100);
console.log(servicePercentPrice);
