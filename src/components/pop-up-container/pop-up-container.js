const container = document.querySelector('.pop-up-container');
const body = document.querySelector('.body');
const mainContainer = document.querySelector('.main-container');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

function open() {
    container.classList.add('pop-up-container--open');
    container.style.height = body.scrollHeight + 'px'
    body.classList.add('body--overflow-hidden-all');
}

function close() {
    container.classList.remove('pop-up-container--open');
    container.style.height = '0px';
    body.classList.remove('body--overflow-hidden-all');
}

function darkenAfter(ms) {
    setTimeout(() => {
        container.classList.add('pop-up-container--darken');
        body.classList.add('body--blured-popup');
    }, ms);
}

function lightenAfter(ms) {
    setTimeout(() => {
        container.classList.remove('pop-up-container--darken');
        body.classList.remove('body--blured-popup');
    }, ms);
}

module.exports = {
    open,
    close,
    darkenAfter,
    lightenAfter
}