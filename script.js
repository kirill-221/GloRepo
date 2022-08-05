'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt(
        'Какие типы экранов нужно разработать?',
        'Простые, Сложные, Интерактивные'
    );
    // screenPrice = +prompt('Сколько будет стоить данная работа?', '10000');
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?', '10000');
    } while (!isNumber(screenPrice));
    adaptive = confirm('Нужен ли адаптив на сайте?', 'true / false');
};

const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        sum += +prompt('Сколько это будет стоить?');

        while (!isNumber(sum)) {
            sum = +prompt('Сколько это будет стоить?');
        }
    }
    return sum;
    // return servicePrice1 + servicePrice2;
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
    return fullPrice - fullPrice * (rollback / 100);
};

const getTitle = function () {
    return (
        title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase()
    );
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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
showTypeOf(screens);
showTypeOf(screenPrice);
showTypeOf(allServicePrices);
showTypeOf(Math.ceil(servicePercentPrice));

console.log(getRollbackMessage(fullPrice));

console.log(screens.length, 'Указывает длину строки');

console.log(
    'Стоимость верстки экранов ' +
        screenPrice +
        ' юани' +
        ' и' +
        ' Стоимость разработки сайта ' +
        fullPrice +
        ' юани'
);
