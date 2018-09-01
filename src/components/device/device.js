const global_API = require('../global_API');

const popup = require('../pop-up');
const devices = document.querySelectorAll('.device__container');

function getDeviceInfo(container) {
    const infoBlock = [...container.children].find(child => ~[...child.classList].indexOf('device__info'));
    let iconClass = [...[...container.children].find(child => ~[...child.classList].indexOf('icon')).classList].find(cl =>
        /^icon--(sun|thermometer|clock)-(on|off)$/.test(cl)
    );
    if (!infoBlock) return {};
    const nameBlock = [...infoBlock.children].find(child => ~[...child.classList].indexOf('device__name')) || null;
    const statusBlock = [...infoBlock.children].find(child => ~[...child.classList].indexOf('device__status')) || null;

    return {
        name: nameBlock ? nameBlock.childNodes[0].data : '',
        status: statusBlock ? statusBlock.childNodes[0].data : '',
        popupType: container.attributes.popuptype.nodeValue,
        iconClass
    }
}

global_API.add('devices', {});
const devicesInfo = global_API.get('devices');
[...devices].map(device => {
    const id = device.attributes.deviceid.nodeValue;
    if (!devicesInfo.hasOwnProperty(id)) {
        devicesInfo[id] = getDeviceInfo(device);
    }

    device.addEventListener('click', function() {
        popup.open(this);
    });
});