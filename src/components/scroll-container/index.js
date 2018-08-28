const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};
  
const scroll = (element, to, duration) => {
    let start = element.scrollLeft;
    let delta = to - start;
    let time = 0;
    let increment = 20;

    let i = setInterval(() => {
        time += increment;
        let val = easeInOutQuad(time, start, delta, duration);
        element.scrollLeft = val;
        if (time >= duration) {
            clearInterval(i);
        }
    }, increment)
}

module.exports = scroll;