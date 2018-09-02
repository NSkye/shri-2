'use strict';

const heading = document.querySelector('.pop-up-dial__heading');
const status = document.querySelector('.pop-up-dial__status');
const popupDial = document.querySelector('.pop-up-dial');
const popupDialIcon = document.querySelector('.pop-up-dial__icon');

function setHeading(h) {
    heading.innerText = h;
}

function setStatus(s) {
    status.innerText = s;
}

function reveal() {
    popupDial.classList.add('pop-up-dial--reveal');
}

function hide() {
    popupDial.classList.remove('pop-up-dial--reveal');
}

let ic;
function setIcon(iconClass) {
    ic = iconClass;
    popupDialIcon.classList.add(ic);
}

function removeIcon() {
    popupDialIcon.classList.remove(ic);
}

module.exports = {
    setHeading,
    setStatus,
    reveal,
    hide,
    setIcon,
    removeIcon
}