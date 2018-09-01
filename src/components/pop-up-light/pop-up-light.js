'use strict';

const slider = require('../slider');

const touchScroll = require('../touch-events');
const wheelScroll = require('../wheel-scroll');
const cursorScroll = require('../cursor-scroll');

const heading = document.querySelector('.pop-up-light__heading');
const status = document.querySelector('.pop-up-light__status');
const popupLight = document.querySelector('.pop-up-light');
const popupLightIcon = document.querySelector('.pop-up-light__icon');

const tagList = document.querySelector('.pop-up-light__taglist');
touchScroll(tagList, tagList, true)
wheelScroll(tagList);
cursorScroll(tagList, 'pop-up-light__taglist--grabbed');

let sliderInstance;

function setHeading(h) {
    heading.innerText = h;
}

function setStatus(s) {
    status.innerText = s;
}

function reveal() {
    popupLight.classList.add('pop-up-light--reveal');
    sliderInstance = slider.initSlider(document.querySelector('.pop-up-light__slider'), 50);
}

function hide() {
    popupLight.classList.remove('pop-up-light--reveal');
    sliderInstance.destroy();
}

let ic;
function setIcon(iconClass) {
    ic = iconClass;
    popupLightIcon.classList.add(ic);
}

function removeIcon() {
    popupLightIcon.classList.remove(ic);
}

module.exports = {
    setHeading,
    setStatus,
    reveal,
    hide,
    setIcon,
    removeIcon
}