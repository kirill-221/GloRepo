'use strict';

const title = document.getElementsByTagName('h1')[0];
const calculateBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const itemsPersent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number ');
const input = document.querySelector('.rollback input');
const spanText = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
const rollbackInput = document.querySelector('.main-controls__range input');

let numberOfScreens = document.querySelector('.main-controls__input input');
let rollbackSpanPersent = document.querySelector('.range-value');
let screenBlock = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    ServicePricesPersent: 0,
    ServicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPersent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();

        calculateBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        rollbackInput.addEventListener('input', appData.changeParams);
    },
    start: function () {
        screenBlock = document.querySelectorAll('.screen');
        let isError = true;

        appData.screens.forEach(function () {
            if (
                numberOfScreens.value === '' ||
                screenBlock.selectedOptions === 0
            ) {
                isError = false;
            }
        });
        console.log(isError, typeof isError);
        if (isError) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.showResult();
        }
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value =
            appData.ServicePricesPersent + appData.ServicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
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

        itemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreens: function () {
        let screenBlock = document.querySelectorAll('.screen');
        screenBlock.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName =
                select.options[select.selectedIndex].textContent.trim();
            let numberScreens = numberOfScreens.value;
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +numberScreens,
            });
        });
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
        // console.log(appData.screens, typeof appData.screens);
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.servicesNumber) {
            appData.ServicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPersent) {
            appData.ServicePricesPersent +=
                appData.screenPrice * (appData.servicesPersent[key] / 100);
        }
        appData.fullPrice =
            +appData.screenPrice +
            appData.ServicePricesPersent +
            appData.ServicePricesNumber;

        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
        totalCountRollback.value = appData.servicePercentPrice;

        let screenMy = 0;
        for (let key of appData.screens) {
            screenMy += +key.count;
        }
        totalCount.value = screenMy;
    },

    changeParams: function (event) {
        rollbackSpanPersent.textContent = event.target.value + '%';
        appData.rollback = +rollbackSpanPersent.textContent.slice(0, -1);
        // console.log(rollbackSpanPersent, typeof rollbackSpanPersent);
    },
};

// for (let key in appData) {
//     // console.log('Ключ:' + key + ' ' + 'Значение:' + appData[key]);
// }

appData.init();
