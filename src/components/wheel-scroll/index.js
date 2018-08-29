function wheelScroll(container, mobileOnly = false) {
    container.addEventListener('wheel', function(e) {
        if (mobileOnly && window.clientWIdth >= 1365) {
            return;
        }
        e.preventDefault();
        this.scrollLeft += e.deltaY*20;
        this.scrollTop = this.scrollTop + e.deltaY*20;
    });
}

module.exports = wheelScroll;