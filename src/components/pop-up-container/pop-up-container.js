const container = document.querySelector('.pop-up-container');
const body = document.querySelector('body');
const mainContainer = document.querySelector('.main-container');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

function open() {
    container.classList.add('pop-up-container--open');
    container.style.height = body.scrollHeight + 'px'
    body.style.overflow = 'hidden';
}

function close() {
    container.classList.remove('pop-up-container--open');
    container.style.height = '0px';
    body.style.overflow = 'visible';
}

function darkenAfter(ms) {
    setTimeout(() => {
        container.classList.add('pop-up-container--darken');
    }, ms);
}

function lightenAfter(ms) {
    setTimeout(() => {
        container.classList.remove('pop-up-container--darken');
    }, ms);
}

module.exports = {
    open,
    close,
    darkenAfter,
    lightenAfter
}