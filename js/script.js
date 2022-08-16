'use strict';

const title = document.getElementsByTagName('h1')[0];
const calculateBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const itemsPersent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number ');
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
    servicesPersent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();

        calculateBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        // appData.asking();
        // appData.addPrices();
        // appData.getFullPrice();
        // appData.getServicePercentPrices();
        // appData.getTitle();
        // appData.logger();
    },
    addScreenBlock: function () {
        const cloneScreen = screenBlock[0].cloneNode(true);

        console.log(cloneScreen);
        screenBlock[screenBlock.length - 1].after(cloneScreen);
    },
    addServices: function () {
        itemsPersent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPersent[label.textContent] = +input.value;
            }
        });
        console.log(appData);
    },
    addScreens: function () {
        let screenBlock = document.querySelectorAll('.screen');
        screenBlock.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName =
                select.options[select.selectedIndex].textContent.trim();
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
            });
        });
        console.log(appData.screens);
    },
    addTitle: function () {
        document.title = title.textContent;
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
    asking: function () {
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
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
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
};

for (let key in appData) {
    console.log('Ключ:' + key + ' ' + 'Значение:' + appData[key]);
}

appData.init();
