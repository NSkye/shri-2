'use strict';

const popupContainer = require('../pop-up-container');
const global_API = require('../global_API');
const popupTypes = {
    'LIGHT': require('../pop-up-light'),
    'TEMP_DIAL': require('../pop-up-dial'),
    'TEMP': require('../pop-up-temp')
}

const popup = document.querySelector('.pop-up');
const body = document.querySelector('.body');
const buttons = [ document.querySelector('.pop-up__accept'), document.querySelector('.pop-up__close') ];

function getContainerInfo(container) {
    const devices = global_API.get('devices');
    const deviceInfo = devices[container.attributes.deviceid.nodeValue];
    return deviceInfo;
}

let specificPopup;
function open(container) {
    const { name, status, popupType, iconClass } = getContainerInfo(container);
    specificPopup = popupTypes[popupType];
    specificPopup.setHeading(name);
    specificPopup.setStatus(status);
    specificPopup.setIcon(iconClass);

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

    //Потом можно будет что-то поэлегантнее придумать
    let desktopWidth = 630;
    let desktopHeight = popupType == 'TEMP_DIAL' ? 450 : 320;

    const adapt = sizes(desktopWidth, desktopHeight, 90, 94);
    const x = window.matchMedia('(max-width: 768px)');

    popup.style.height = initialHeight/body.clientHeight*100 + 'vh';
    popup.style.width = initialWidth/body.clientWidth*100 + 'vw';
    popup.style.top = initialPositionY/body.clientHeight*100 + 'vh';
    popup.style.left = initialPositionX/body.clientWidth*100 + 'vw';

    popupContainer.open();
    setTimeout(() => {
        popup.classList.add('pop-up--open');
        specificPopup.reveal();
    }, 200)
    adapt(x);
    popupContainer.darkenAfter(0);

    window.addEventListener('resize', adapt);

    global_API.add('CURRENT_POPUP', container);
}

/**
 * Задать размеры попапа
 * @param {number} wd ширина на десктопе (px)
 * @param {number} hd высота на десктопе (px)
 * @param {number} wm ширина на мобильных устройствах (vw)
 * @param {number} hm высота на мобильных устройствах (vh)
 */
function sizes(wd, hd, wm, hm) {
    return function adapt(x) {
        let w, h;
        if (body.clientWidth<768) {
            w = wm;
            h = hm;
            popup.style.height = h + 'vh';
            popup.style.width = w + 'vw';
            popup.style.top = 50 - h/2 + 'vh';
            popup.style.left = 50 - w/2 + 'vw';
        } else {
            w = wd;
            h = hd;
            popup.style.height = h + 'px';
            popup.style.width = w + 'px';
            popup.style.top = body.clientHeight/2 - h/2 + 'px';
            popup.style.left = body.clientWidth/2 - w/2 + 'px';
        }

        
    }
}

function close() {
    const container = global_API.get('CURRENT_POPUP');
    const viewportOffset = container.getBoundingClientRect();
    popup.classList.remove('pop-up--open');
    specificPopup.hide();
    specificPopup.removeIcon();
    popup.style.height = container.clientHeight + 'px';
    popup.style.width = container.clientWidth + 'px';
    popup.style.top = viewportOffset.top + 'px';
    popup.style.left = viewportOffset.left + 'px';
    popupContainer.lightenAfter(0);
    setTimeout(popupContainer.close, 200);
}

[...buttons].map(b => b.addEventListener('click', close));

module.exports = {
    open,
    close
}