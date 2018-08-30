'use strict';

const popupContainer = require('../pop-up-container');
const global_API = require('../global_API');

const popup = document.querySelector('.pop-up');
const popupContainerElement = document.querySelector('.pop-up-container');
const body = document.querySelector('.body');

function getContainerInfo(container) {
    const infoBlock = [...container.children].find(child => ~[...child.classList].indexOf('device__info'))
    if (!infoBlock) return {};
    return {
        name: [...infoBlock.children].find(child => ~[...child.classList].indexOf('device__name')).childNodes[0].data,
        status: [...infoBlock.children].find(child => ~[...child.classList].indexOf('device__status')).childNodes[0].data,
        popupType: container.attributes.popuptype.nodeValue
    }
}

function open(container) {
    console.log(getContainerInfo(container));

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

    const [ h, w ] = [ 200, 250 ];

    popup.style.height = initialHeight + 'px';
    popup.style.width = initialWidth + 'px';
    popup.style.marginTop = initialPositionY + 'px';
    popup.style.marginLeft = initialPositionX + 'px';

    popupContainer.open();
    popup.style.height = h + 'px';
    popup.style.width = w + 'px';
    popup.style.marginTop = body.clientHeight/2 - h/2 + 'px';
    popup.style.marginLeft = body.clientWidth/2 - w/2 + 'px';
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