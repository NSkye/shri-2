'use strict';

const bb = document.querySelector('.blocker-block');
const body = document.querySelector('.body');

function open() {
    bb.style.height = body.scrollHeight + 'px';
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