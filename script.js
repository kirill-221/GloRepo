'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 2,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt(
            'Как называется ваш проект?',
            'Калькулятор верстки'
        );
        appData.screens = prompt(
            'Какие типы экранов нужно разработать?',
            'Простые, Сложные, Интерактивные'
        );
        // screenPrice = +prompt('Сколько будет стоить данная работа?', '10000');
        do {
            appData.screenPrice = prompt(
                'Сколько будет стоить данная работа?',
                '10000'
            );
        } while (!appData.isNumber(appData.screenPrice));
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            let price = 0;
            if (i === 0) {
                appData.service1 = prompt(
                    'Какой дополнительный тип услуги нужен?'
                );
            } else if (i === 1) {
                appData.service2 = prompt(
                    'Какой дополнительный тип услуги нужен?'
                );
            }

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            sum += +price;
        }
        return sum;
    },
    getFullPrice: function () {
        return +appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },
    getTitle: function () {
        return (
            appData.title.trim()[0].toUpperCase() +
            appData.title.trim().substring(1).toLowerCase()
        );
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
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger();
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    },
};

for (let key in appData) {
    console.log('Ключ:' + key + ' ' + 'Значение:' + appData[key]);
}

appData.start();
