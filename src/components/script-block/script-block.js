'use strict';

const popup = require('../pop-up');
const scriptBlocks = document.querySelectorAll('.script__container');

[...scriptBlocks].map(scriptBlock => {
    scriptBlock.addEventListener('click', function() {
        popup.open(this);
    });
});