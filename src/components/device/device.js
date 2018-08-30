const popupContainer = require('../pop-up-container');
const popup = require('../pop-up');
const devices = document.querySelectorAll('.device__container');

[...devices].map(device => {
    /*device.addEventListener('click', () => {
        popupContainer.open();
        popupContainer.darkenAfter(200);
    });*/
    device.addEventListener('click', function() {
        popup.open(this);
    });
});