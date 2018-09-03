'use strict';

const Slider = require('../slider');

const touchScroll = require('../touch-events');
const wheelScroll = require('../wheel-scroll');
const cursorScroll = require('../cursor-scroll');

const heading = document.querySelector('.pop-up-temp__heading');
const status = document.querySelector('.pop-up-temp__status');
const popupTemp = document.querySelector('.pop-up-temp');
const popupTempIcon = document.querySelector('.pop-up-temp__icon');

const tagList = document.querySelector('.pop-up-temp__taglist');
touchScroll(tagList, tagList, true)
wheelScroll(tagList);
cursorScroll(tagList, 'pop-up-temp__taglist--grabbed');

let sliderInstance;

function setHeading(h) {
    heading.innerText = h;
}

function setStatus(s) {
    status.innerText = s;
}

function reveal() {
    popupTemp.classList.add('pop-up-temp--reveal');
    sliderInstance = new Slider(document.querySelector('.pop-up-temp__slider'), 50);
}

function hide() {
    popupTemp.classList.remove('pop-up-temp--reveal');
    sliderInstance.destroy();
}

let ic;
function setIcon(iconClass) {
    ic = iconClass;
    popupTempIcon.classList.add(ic);
}

function removeIcon() {
    popupTempIcon.classList.remove(ic);
}

module.exports = {
    setHeading,
    setStatus,
    reveal,
    hide,
    setIcon,
    removeIcon
}