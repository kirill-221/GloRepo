'use strict';

const title = document.getElementsByTagName('h1')[0];
const calculateBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');
const itemsPersent = document.querySelectorAll('.percent');
const itemsNumber = document.querySelectorAll('.number ');
const input = document.querySelector('.rollback input');
const spanText = document.querySelector('.rollback .range-value');
const totalInput = document.getElementsByClassName('total-input')[0];
const totalInput1 = document.getElementsByClassName('total-input')[1];
const totalInput2 = document.getElementsByClassName('total-input')[2];
const totalInput3 = document.getElementsByClassName('total-input')[3];
const totalInput4 = document.getElementsByClassName('total-input')[4];
let screenBlock = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 2,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    asking: function () {
        do {
            appData.title = prompt(
                'Как называется ваш проект?',
                'Калькулятор верстки'
            );
        } while (appData.isNumber(String(appData.title)));
        console.log(appData.title, typeof appData.title);

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } while (appData.isNumber(String(name)));
            console.log(name, typeof name);

            do {
                price = +prompt('Сколько будет стоить данная работа?', '10000');
            } while (!appData.isNumber(price));
            console.log(price, typeof price);

            appData.screens.push({
                id: i,
                name: name,
                price: price,
            });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (appData.isNumber(String(name)));
            console.log(name, typeof name);

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            console.log(price, typeof price);

            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },
    getTitle: function () {
        appData.title =
            appData.title.trim()[0].toUpperCase() +
            appData.title.trim().substring(1).toLowerCase();
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000 && price < 30000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0 && price < 15000) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },
    logger: function () {
        console.log(appData.title, typeof appData.title);
        console.log(appData.fullPrice, typeof appData.fullPrice);
        console.log(
            appData.servicePercentPrice,
            typeof appData.servicePercentPrice
        );
        console.log(appData.screens, typeof appData.screens);
    },
};

for (let key in appData) {
    console.log('Ключ:' + key + ' ' + 'Значение:' + appData[key]);
}

appData.start();
