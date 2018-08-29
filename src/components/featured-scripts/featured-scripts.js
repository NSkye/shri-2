const touchScroll = require('../touch-events');
const scroll = require('../scroll-container');
const wheelScroll = require('../wheel-scroll');
const cursorScroll = require('../cursor-scroll');

const backward = document.querySelector('.featured-scripts__backward');
const forward = document.querySelector('.featured-scripts__forward');
const container = document.querySelector('.featured-scripts__container');
const area = document.querySelector('.featured-scripts');

touchScroll(area, container, false, true);
wheelScroll(container, true);
cursorScroll(container, 'featured-scripts__container--grabbed', true);

let position = 0;

function scrollForward() {
    position+=container.clientWidth;
    if (position > container.scrollWidth - container.clientWidth) {
        position = container.scrollWidth - container.clientWidth;
    }
    scroll(container, position, 200)
}

function scrollBackward() {
    position-=container.clientWidth;
    if (position < 0) {
        position = 0;
    }
    scroll(container, position, 200)
}

forward.addEventListener('click', scrollForward);
backward.addEventListener('click', scrollBackward);

container.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (window.innerWidth > 1364) {
        if (e.deltaY > 0) {
            scrollForward();
        } else if (e.deltaY < 0) {
            scrollBackward();
        }
    } else {
        container.scrollLeft += e.deltaY*20;
        container.scrollTop = this.scrollTop + e.deltaY*20;
    }
});


