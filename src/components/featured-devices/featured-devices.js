const touchScroll = require('../touch-events');
const scroll = require('../scroll-container');
const wheelScroll = require('../wheel-scroll');
const cursorScroll = require('../cursor-scroll');

const forward = document.querySelector('.featured-devices__forward');
const backward = document.querySelector('.featured-devices__backward');
const container = document.querySelector('.featured-devices__container');

touchScroll(container, container);
wheelScroll(container);
cursorScroll(container, 'featured-devices__container--grabbed');

let position = 0;
forward.addEventListener('click', () => {
    position+=container.clientWidth;
    if (position > container.scrollWidth - container.clientWidth) {
        position = container.scrollWidth - container.clientWidth;
    }
    scroll(container, position, 200)
});

backward.addEventListener('click', () => {
    position-=container.clientWidth;
    if (position < 0) {
        position = 0;
    }
    scroll(container, position, 200)
});