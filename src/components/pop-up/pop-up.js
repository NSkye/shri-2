'use strict';

const popupContainer = require('../pop-up-container');
const global_API = require('../global_API');

const popup = document.querySelector('.pop-up');
const popupContainerElement = document.querySelector('.pop-up-container');

function open(container) {
    const viewportOffset = container.getBoundingClientRect();
    const [
        initialHeight,
        initialWidth,
        initialPositionX,
        initialPositionY
    ] = [
        container.clientHeight,
        container.clientWidth,
        viewportOffset.left,
        viewportOffset.top
    ]

    popup.style.height = initialHeight + 'px';
    popup.style.width = initialWidth + 'px';
    popup.style.marginTop = initialPositionY + 'px';
    popup.style.marginLeft = initialPositionX + 'px';

    popupContainer.open();
    popup.style.height = '400px';
    popup.style.width = '500px';
    popup.style.marginTop = window.innerHeight/2 - 400/2 + 'px';
    popup.style.marginLeft = window.innerWidth/2 - 500/2 + 'px';
    popupContainer.darkenAfter(0);

    global_API.add('CURRENT_POPUP', { initialHeight, initialWidth, initialPositionX, initialPositionY });
}

function close() {
    const { initialHeight, initialWidth, initialPositionX, initialPositionY } = global_API.get('CURRENT_POPUP');
    popup.style.height = initialHeight + 'px';
    popup.style.width = initialWidth + 'px';
    popup.style.marginTop = initialPositionY + 'px';
    popup.style.marginLeft = initialPositionX + 'px';
    popupContainer.lightenAfter(0);
    setTimeout(popupContainer.close, 200);
}

popupContainerElement.addEventListener('click', close);

module.exports = {
    open,
    close
}