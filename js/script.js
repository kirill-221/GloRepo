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
        this.addTitle();

        calculateBtn.addEventListener('click', () => {
            let start = this.start.bind(appData);
            start();
        });
        buttonPlus.addEventListener('click', () => {
            this.addScreenBlock();
        });
        rollbackInput.addEventListener('input', () => {
            let changeParams = this.changeParams.bind(appData, event);
            changeParams();
        });
        resetBtn.addEventListener('click', () => {
            let reset = this.reset.bind(appData);
            reset();
        });
    },
    reset: function () {
        this.screens = document.querySelectorAll('.screen');
        this.screens.forEach((item) => {
            const select = item.querySelector('select');
            const input = item.querySelector('input');
            select.value = '';
            input.value = '';
            select.disabled = false;
            input.disabled = false;

            for (let i = 0; i < this.screens.length - 1; i++) {
                this.screens[i].remove();
            }
        });

        itemsPersent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
            check.disabled = false;
        });

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
            check.disabled = false;
        });

        let inputs = document.querySelectorAll('.total-input');
        for (let input of inputs) {
            input.value = 0;
        }

        // let allSelect = document.querySelectorAll(
        //     '.main-controls__select select'
        // );
        // for (let select of allSelect) {
        //     select.value = select.options[0].value;
        // }

        buttonPlus.disabled = false;
        rollbackInput.disabled = false;
        rollbackInput.value = 0;
        rollbackSpanPersent.textContent = 0 + '%';

        calculateBtn.style.display = 'block';
        resetBtn.style.display = 'none';
    },
    start: function () {
        screenBlock = document.querySelectorAll('.screen');
        let isError = true;

        this.screens.forEach(() => {
            if (
                numberOfScreens.value === '' ||
                screenBlock.selectedOptions === 0
            ) {
                isError = false;
            }
        });
        console.log(isError, typeof isError);
        if (isError) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();
        }

        this.screens = document.querySelectorAll('.screen');
        this.screens.forEach((item) => {
            const select = item.querySelector('select');
            const input = item.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        });
        calculateBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value =
            this.ServicePricesPersent + this.ServicePricesNumber;
        fullTotalCount.value = this.fullPrice;
    },
    addScreenBlock: function () {
        const cloneScreen = screenBlock[0].cloneNode(true);

        console.log(cloneScreen);
        screenBlock[screenBlock.length - 1].after(cloneScreen);
    },
    addServices: function () {
        itemsPersent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPersent[label.textContent] = +input.value;
            }
        });

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreens: function () {
        let screenBlock = document.querySelectorAll('.screen');
        screenBlock.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName =
                select.options[select.selectedIndex].textContent.trim();
            let numberScreens = numberOfScreens.value;
            this.screens.push({
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
        console.log(this.title, typeof this.title);
        console.log(this.fullPrice, typeof this.fullPrice);
        console.log(this.servicePercentPrice, typeof this.servicePercentPrice);
        // console.log(appData.screens, typeof appData.screens);
    },
    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        for (let key in this.servicesNumber) {
            this.ServicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPersent) {
            this.ServicePricesPersent +=
                this.screenPrice * (this.servicesPersent[key] / 100);
        }
        this.fullPrice =
            +this.screenPrice +
            this.ServicePricesPersent +
            this.ServicePricesNumber;

        this.servicePercentPrice =
            this.fullPrice - this.fullPrice * (this.rollback / 100);
        totalCountRollback.value = this.servicePercentPrice;

        let screenMy = 0;
        for (let key of this.screens) {
            screenMy += +key.count;
        }
        totalCount.value = screenMy;
    },

    changeParams: function (event) {
        rollbackSpanPersent.textContent = event.target.value + '%';
        this.rollback = +rollbackSpanPersent.textContent.slice(0, -1);
        // console.log(rollbackSpanPersent, typeof rollbackSpanPersent);
    },
};

// for (let key in appData) {
//     // console.log('Ключ:' + key + ' ' + 'Значение:' + appData[key]);
// }

appData.init();
