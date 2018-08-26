const globalAPI = require('../global_API');

const navigationLinks = document.querySelectorAll('.navigation__link');

[...navigationLinks].map(a => {
    const elhref = a.getAttribute('href');
    if (elhref == window.location.pathname) {
        a.classList.toggle('navigation__link--active');
    }
});

globalAPI.add('navigation', {
    toggle() {
        const nav = document.querySelector('.navigation');
        const body = document.querySelector('body');
        nav.classList.toggle('navigation--open');
        body.classList.toggle('nav-open');
        body.classList.toggle('blured');
    }
})