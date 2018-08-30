'use strict';

const popupContainer = require('../pop-up-container');
const global_API = require('../global_API');

const popup = document.querySelector('.pop-up');
const popupContainerElement = document.querySelector('.pop-up-container');
const body = document.querySelector('.body');
const buttons = [ document.querySelector('.pop-up__accept'), document.querySelector('.pop-up__close') ];

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

    const adapt = sizes(46.1, 41, 90, 94);
    const x = window.matchMedia('(max-width: 768px)');

    popup.style.height = initialHeight/body.clientHeight*100 + 'vh';
    popup.style.width = initialWidth/body.clientWidth*100 + 'vw';
    popup.style.top = initialPositionY/body.clientHeight*100 + 'vh';
    popup.style.left = initialPositionX/body.clientWidth*100 + 'vw';

    popupContainer.open();
    setTimeout(() => {
        popup.classList.add('pop-up--open');
    }, 200)
    adapt(x);
    popupContainer.darkenAfter(0);

    window.matchMedia('(max-width: 1364px)').addListener(adapt);

    global_API.add('CURRENT_POPUP', container);
}

/**
 * Задать размеры попапа
 * @param {number} wd ширина на десктопе (vw)
 * @param {number} hd высота на десктопе (vh)
 * @param {number} wm ширина на мобильных устройствах (vw)
 * @param {number} hm высота на мобильных устройствах (vh)
 */
function sizes(wd, hd, wm, hm) {
    return function adapt(x) {
        let w, h;
        if (x.matches) {
            w = wm;
            h = hm;
        } else {
            w = wd;
            h = hd;
        }

        popup.style.height = h + 'vh';
        popup.style.width = w + 'vw';

        popup.style.top = 50 - h/2 + 'vh';
        popup.style.left = 50 - w/2 + 'vw';
    }
}

function close() {
    const container = global_API.get('CURRENT_POPUP');
    const viewportOffset = container.getBoundingClientRect();
    popup.classList.remove('pop-up--open');
    popup.style.height = container.clientHeight + 'px';
    popup.style.width = container.clientWidth + 'px';
    popup.style.top = viewportOffset.top + 'px';
    popup.style.left = viewportOffset.left + 'px';
    popupContainer.lightenAfter(0);
    setTimeout(popupContainer.close, 200);
}

popupContainerElement.addEventListener('click', close);
[...buttons].map(b => b.addEventListener('click', close));

module.exports = {
    open,
    close
}