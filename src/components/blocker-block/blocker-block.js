'use strict';

const bb = document.querySelector('.blocker-block');

function open() {
    bb.classList.add('blocker-block--block');
    bb.classList.add('blocker-block--darken');
}

function close() {
    bb.classList.remove('blocker-block--darken');
    setTimeout(() => {
        bb.classList.remove('blocker-block--block');
    }, 200)
}

module.exports = {
    open,
    close
}