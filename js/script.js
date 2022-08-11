const commerical = document.querySelector('.adv');
const body = document.querySelector('body');
const maitTitle = document.querySelector('h1');
const blocks = document.querySelectorAll('.book');

const ulHtml = document.querySelectorAll('ul');
const newElem = document.createElement('li');

console.log(ulHtml);

const elemLi = document.querySelectorAll('li');

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
maitTitle.textContent = 'Книга 3. this и Прототипы Объектов';

blocks[0].before(blocks[1]);
blocks[2].before(blocks[4]);
blocks[2].before(blocks[3]);
blocks[5].after(blocks[2]);

commerical.remove();

// элементы книги2
elemLi[3].after(elemLi[6]);
elemLi[4].before(elemLi[8]);
elemLi[10].before(elemLi[2]);

//элементы книги5;
elemLi[49].before(elemLi[55]);
elemLi[50].after(elemLi[48]);
elemLi[53].before(elemLi[52]);
elemLi[53].after(elemLi[51]);

//Добавление главы в книгу 6
newElem.textContent = 'Глава 8: За пределами ES6';
ulHtml[2].append(newElem);
