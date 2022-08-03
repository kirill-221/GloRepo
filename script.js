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
let servicePercentPrice = fullPrice - fullPrice * (rollback / 100);
let allServicePrices = servicePrice1 + servicePrice2;

const getAllServicePrices = function (allServicePrices) {
    return allServicePrices;
};

function getFullPrice() {
    const fullPrice = screenPrice + allServicePrices;
    return fullPrice;
}

const getTitle = function (title) {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};

const getServicePercentPrices = function (servicePercentPrice) {
    return servicePercentPrice;
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getAllServicePrices(allServicePrices));
console.log(getFullPrice());
console.log(getTitle(title.trimStart()));
console.log(getServicePercentPrices(Math.ceil(servicePercentPrice)));

console.log(getRollbackMessage(fullPrice));

console.log(screens);
