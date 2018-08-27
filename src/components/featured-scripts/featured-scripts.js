const pages = document.querySelectorAll('.featured-scripts__page');
const backward = document.querySelector('.featured-scripts__backward');
const forward = document.querySelector('.featured-scripts__forward')

forward.addEventListener('click', () => {
    const notScrolledPages = [...pages].filter(page => !~[...page.classList].indexOf('featured-scripts__page--scrolled'));
    if (notScrolledPages.length == 1) {
        return;
    }
    const page = notScrolledPages[0];
    page.classList.add('featured-scripts__page--scrolled');
});

backward.addEventListener('click', () => {
    const ScrolledPages = [...pages].filter(page => ~[...page.classList].indexOf('featured-scripts__page--scrolled'));
    if (ScrolledPages.length == 0) {
        return;
    }
    const page = ScrolledPages[ScrolledPages.length - 1];
    page.classList.remove('featured-scripts__page--scrolled');
});