const globalAPI = require('../global_API');

const navButton = document.querySelector('.nav-button');

navButton.addEventListener('click', function() {
    globalAPI.get('navigation').toggle();
    this.classList.toggle('nav-button--active');
});