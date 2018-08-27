module.exports = function touchScroll(area, target, widthY=false, onlyMobile=false) {
    let tmpX, tmpY
  
    area.addEventListener('touchstart', e => {

        if (onlyMobile && window.innerWidth > 1364) {
            return;
        }

        tmpX = e.touches[0].clientX + target.scrollLeft
        if (widthY) {
            tmpY = e.touches[0].clientY + target.scrollTop
        }
    });
  
    area.addEventListener('touchmove', e => {

        if (onlyMobile && window.innerWidth > 1364) {
            return;
        }

        e.preventDefault()
        const diffX = tmpX - e.touches[0].clientX
        target.scrollLeft = diffX
        if (widthY) {
            const diffY = tmpY - e.touches[0].clientY
            target.scrollTop = diffY
        }
    });

}