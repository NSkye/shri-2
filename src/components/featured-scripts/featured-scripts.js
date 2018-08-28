const touchScroll = require('../touch-events');
const scroll = require('../scroll-container');

const backward = document.querySelector('.featured-scripts__backward');
const forward = document.querySelector('.featured-scripts__forward');
const container = document.querySelector('.featured-scripts__container');
const area = document.querySelector('.featured-scripts');

touchScroll(area, container, false, true);

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

