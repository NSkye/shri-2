function cursorScroll(container, grabbedClass, mobileOnly = false) {
    let isDown = false;
    let tempX;
    let tempY;

    container.addEventListener('mousedown', e => {
        if (mobileOnly && window.innerWidth >= 1365) {
            return;
        }
        isDown = true;
        tempX = e.layerX;
        tempY = e.layerY;
        container.classList.add(grabbedClass)
    });

    container.addEventListener('mousemove', e => {
        if (mobileOnly && window.innerWidth >= 1365) {
            return;
        }
        if (!isDown) return;
        container.scrollLeft += tempX - e.layerX;
        container.scrollTop += tempY - e.layerY;
    });

    container.addEventListener('mouseup', () => {
        if (mobileOnly && window.innerWidth >= 1365) {
            return;
        }
        isDown = false;
        container.classList.remove(grabbedClass)
    });

    container.addEventListener('mouseleave', () => {
        if (mobileOnly && window.innerWidth >= 1365) {
            return;
        }
        isDown = false;
        container.classList.remove(grabbedClass)
    });
}

module.exports = cursorScroll;