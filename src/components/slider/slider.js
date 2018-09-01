const body = document.querySelector('.body');

function layer(slider, e) {
    let el = slider;
    x = 0;
    y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }

    if (!e.clientX || !e.clientY) {
        e = e.touches[0];
    }

    X = e.clientX - x;
    Y = e.clientY - y;
    return { X, Y }
}

/**
 * Посчитать оффсет в процентах от начала слайдера в зависимости от положения курсора
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Number} raw положение курсора по вертикали, либо по горизонтали, в зависимости от режима
 * @param {String} mode режим в котором находится слайдер (вертикальный или горизонтальный) (X/Y)
 * @returns {Number}
 */
function calculateOffset(slider, raw, mode) {
    const originalLength = mode == 'X' ? slider.clientWidth : slider.clientHeight;
    let adj = raw - 30;
    adj = adj > originalLength - 60 ? originalLength - 60 : adj < 0 ? 0 : adj;

    return adj/originalLength * 100;
}

/**
 * Перевести проценты заполненности слайдера (0-100%) в проценты оффсета указателя слайдера
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Number} percentage Значение, которое мы хотим установить на слайдере (0-100%)
 * @param {String} mode режим в котором находится слайдер (вертикальный или горизонтальный) (X/Y)
 * @returns {Number}
 */
function offsetFromPercentage(slider, percentage, mode) {
    const originalLength = mode == 'X' ? slider.clientWidth : slider.clientHeight;
    const maxPosition = originalLength - 60;
    const offset = ((maxPosition/100*percentage)/originalLength)*100;
    return offset;
}

/**
 * Перевести проценты оффсета указателя слайдера в проценты его заполненности (выставленное значение)
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Number} offset оффсет указателя слайдера
 * @param {String} mode режим в котором находится слайдер (вертикальный или горизонтальный) (X/Y)
 */
function percentageFromOffset(slider, offset, mode) {
    const originalLength = mode == 'X' ? slider.clientWidth : slider.clientHeight;
    const maxPosition = originalLength - 60;
    const pxOffset = (originalLength/100)*offset;
    const percentage = (pxOffset/maxPosition)*100
    return percentage;
}

/**
 * Создает функцию для установки значения слайдеру
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Object} slidingThing объект указателя слайдера
 * @param {Object} state состояние слайдера
 * @returns {Function}
 */
function sv(slider, slidingThing, state) {
    return function setValue(value) {
        let property;
        let mode;
        if (body.clientWidth <= 768) { 
            property = 'top'; 
            mode = 'Y';
        } else { 
            property = 'left';
            mode = 'X';
        }
        state.offset = offsetFromPercentage(slider, value, mode);
        state.value = value;
        slidingThing.style[property] = offset;
    }
}

/**
 * Создает функцию для получения значения слайдера
 * @param {Object} state состояние слайдера
 */
function gv(state) {
    return function getValue() {
        return state.value;
    }
}

/**
 * Создает функцию для ресайзинга слайдера
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Object} state состояние слайдера
 * @param {Object} slidingThing объект указателя слайдера
 */
function rsz(slider, state, slidingThing) {
    return function resize () {
        state.mode = body.clientWidth <= 768 ? 'Y' : 'X';
        state.offset = offsetFromPercentage(slider, state.value, state.mode);
        slidingThing.style[state.mode == 'X' ? 'left' : 'top'] = state.offset.toFixed(2) + '%';
        slidingThing.style[state.mode == 'Y' ? 'left' : 'top'] = 'auto';
    }
}

/**
 * Инициализировать слайдер. Возвращает объект с методами для управления слайдером.
 * @param {Object} slider DOM-Node-объект слайдера
 * @param {Number} initialValue начальное значение (0-100)
 */
function initSlider(slider, initialValue) {
    const slidingThing = [...slider.children].find(child => [...child.classList].find(cl => cl == 'slider__sliding-thing'));
    
    const state = {
        value: initialValue,
        offset: offsetFromPercentage(slider, initialValue, body.clientWidth <= 768 ? 'Y' : 'X'),
        mode: body.clientWidth <= 768 ? 'Y' : 'X'
    }
    slidingThing.style[state.mode == 'X' ? 'left' : 'top'] = state.offset.toFixed(2) + '%';
    slidingThing.style[state.mode == 'Y' ? 'left' : 'top'] = 'auto';

    let isDown = false;
    let position = 0;
    function sliderMousedown(e) {
        isDown = true;
        position = layer(slider, e)[state.mode];
        //position = e[`layer${state.mode}`];
        state.offset = calculateOffset(slider, position, state.mode);
        state.value = percentageFromOffset(slider, state.offset, state.mode);
        slidingThing.style[state.mode == 'X' ? 'left' : 'top'] = state.offset.toFixed(2) + '%';
    }
    function sliderMousemove(e) {
        if (!isDown) { return; }
        //position += e[`movement${state.mode}`];
        position = layer(slider, e)[state.mode];
        state.offset = calculateOffset(slider, position, state.mode);
        state.value = percentageFromOffset(slider, state.offset, state.mode);
        slidingThing.style[state.mode == 'X' ? 'left' : 'top'] = state.offset.toFixed(2) + '%';
    }
    function sliderMouseup() { isDown = false };
    
    const resize = rsz(slider, state, slidingThing);
    slider.addEventListener('mousedown', sliderMousedown);
    slider.addEventListener('touchstart', sliderMousedown);
    slider.addEventListener('mousemove', sliderMousemove);
    slider.addEventListener('touchmove', sliderMousemove);
    slider.addEventListener('mouseup', sliderMouseup);
    window.addEventListener('resize', resize);
    body.addEventListener('mouseup', sliderMouseup);

    return {
        setValue: sv(slider, slidingThing, state),
        getValue: gv(state),
        destroy: function destroy() {
            const listeners = [
                ['mousedown', sliderMousedown],
                ['mouseup', sliderMouseup],
                ['mousemove', sliderMousemove]
            ].map(listener => {
                slider.removeEventListener(listener[0], listener[1]);
            });
            window.removeEventListener('resize', resize);
        }
    }
}

module.exports = {
    initSlider
}