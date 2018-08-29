const touchScroll = require('../touch-events');
const wheelScroll = require('../wheel-scroll');
const cursorScroll = require('../cursor-scroll');

const devices = document.querySelector('.summary__devices')

touchScroll(devices, devices, true)
wheelScroll(devices);
cursorScroll(devices, 'summary__devices--grabbed');