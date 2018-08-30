const globalAPI = require('../global_API');

const navigationLinks = document.querySelectorAll('.navigation__link');
const blockerBlock = require('../blocker-block');

[...navigationLinks].map(a => {
    const elhref = a.getAttribute('href');
    if (elhref == window.location.pathname) {
        a.classList.toggle('navigation__link--active');
    }
});

isOpen = false;

globalAPI.add('navigation', {
    toggle() {
        const nav = document.querySelector('.navigation');
        const body = document.querySelector('body');

        if (!isOpen) {
            nav.classList.add('navigation--open');
            body.classList.add('nav-open');
            body.classList.add('blured');
            body.style.overflow = 'hidden';
            blockerBlock.open();
        } else {
            nav.classList.remove('navigation--open');
            body.classList.remove('nav-open');
            body.classList.remove('blured');
            body.style.overflow = 'visible';
            blockerBlock.close();
        }

        isOpen = !isOpen;
    }
})