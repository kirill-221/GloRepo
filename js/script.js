const commerical = document.querySelector('.adv');
const body = document.querySelector('body');
const maitTitle = document.querySelector('h1');
const blocks = document.querySelectorAll('.book');

// const ul = document.querySelectorAll('li');

// console.log(ul);

const li1 = document.querySelectorAll('li');

// let lil = li1[1];
// console.log(lil);

console.log(li1);

console.log(blocks);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
maitTitle.textContent = 'Книга 3. this и Прототипы Объектов';

blocks[0].before(blocks[1]);
blocks[2].before(blocks[4]);
blocks[2].before(blocks[3]);
blocks[5].after(blocks[2]);
commerical.remove();
