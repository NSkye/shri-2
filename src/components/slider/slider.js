const body = document.querySelector('.body');

class Slider {
    constructor(slider, initialValue) {
        this.slider = slider;
        this.slidingThing = [...slider.children]
        .find(child => 
            [...child.classList]
            .find(cl => cl == 'slider__sliding-thing')
        );

        const mode = body.clientWidth <= 768 ? 'Y' : 'X';
        this.state = {
            value: initialValue,
            mode: mode,
            offset: this.offsetFromPercentage(initialValue, mode)
        }

        this.slidingThing.style[this.state.mode == 'X' ? 'left' : 'bottom'] = this.state.offset.toFixed(2) + '%';
        this.slidingThing.style[this.state.mode == 'Y' ? 'left' : 'bottom'] = 'auto';

        this.isDown = false;
        this.position = 0;

        this.sliderListeners = [
            [ 'mousedown', this.sliderMousedown ],
            [ 'touchstart', this.sliderMousedown ],
            [ 'mousemove', this.sliderMousemove ],
            [ 'touchmove', this.sliderMousemove ],
            [ 'mouseup', this.sliderMouseup ],
        ].map(item => {
            const listener = item[1].bind(this);
            this.slider.addEventListener(item[0], listener);
            return [ item[0], listener ]
        });

        this.otherListeners = [
            [ window, 'resize', this.resize ],
            [ body, 'mouseup', this.sliderMouseup ]
        ].map(item => {
            const el = item[0];
            const eventName = item[1];
            const listener = item[2].bind(this);
            el.addEventListener(eventName, listener);
            return [ el, eventName, listener ]
        });
    }

    destroy() {
        this.sliderListeners.map(item => {
            this.slider.removeEventListener(item[0], item[1]);
        });
        this.otherListeners.map(item => {
            item[0].removeEventListener(item[1], item[2]);
        });
    }

    /**
     * Посчитать оффсет в процентах от начала слайдера в зависимости от положения курсора
     * @param {Number} raw положение курсора по вертикали, либо по горизонтали, в зависимости от режима
     * @returns {Number}
     */
    calculateOffset(raw) {
        const originalLength = this.state.mode == 'X' ? this.slider.clientWidth : this.slider.clientHeight;
        let adj;
        adj = raw - 30;
        adj = adj > originalLength - 60 ? originalLength - 60 : adj < 0 ? 0 : adj;

        return this.state.mode == 'X' ? adj/originalLength * 100 : 100 - ((adj+60)/originalLength * 100)
    }

    /**
     * Перевести проценты заполненности слайдера (0-100%) в проценты оффсета указателя слайдера
     * @param {Number} percentage значение, которое мы хотим установить на слайдере (0-100%)
     * @param {String} [mode] режим в котором находится слайдер (вертикальный или горизонтальный) (X/Y)
     * @returns {Number}
     */   
    offsetFromPercentage(percentage, mode = this.state.mode) {
        const slider = this.slider;
        const originalLength = mode == 'X' ? slider.clientWidth : slider.clientHeight;
        const maxPosition = originalLength - 60;
        const offset = ((maxPosition/100*percentage)/originalLength)*100;
        return offset;
    }

    /**
     * Перевести проценты оффсета указателя слайдера в проценты его заполненности (выставленное значение)
     * @param {Number} offset оффсет указателя слайдера
     */    
    percentageFromOffset(offset) {
        const [ slider, mode ] = [ this.slider, this.state.mode ]
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
    setValue(value) {
        const [ slider, slidingThing, state, mode ] = [ this.slider, this.slidingThing, this.state, this.state.mode ];
        let property = mode == 'Y' ? 'bottom' : 'left';
        state.offset = this.offsetFromPercentage(value);
        state.value = value;
        slidingThing.style[property] = state.offset + '%';
    }

    get value() {
        return this.state.value;
    }

    /**
     * Полифилл для LayerX, LayerY, так как они не везде поддерживаются и их нет в тач ивентах
     * @param {Object} e событие
     */
    layer(e) {
        let slider = this.slider;
        let x = 0;
        let y = 0;
    
        while (slider && !isNaN(slider.offsetLeft) && !isNaN(slider.offsetTop)) {
            x += slider.offsetLeft - slider.scrollLeft;
            y += slider.offsetTop - slider.scrollTop;
            slider = slider.offsetParent;
        }
    
        if (!e.clientX || !e.clientY) {
            e = e.touches[0];
        }
    
        let X = e.clientX - x;
        let Y = e.clientY - y;
        return { X, Y }
    }

    sliderMousedown(e) {
        const state = this.state;
        this.isDown = true;
        this.position = this.layer(e)[state.mode];
        state.offset = this.calculateOffset(this.position);
        state.value = this.percentageFromOffset(state.offset);
        this.slidingThing.style[state.mode == 'X' ? 'left' : 'bottom'] = state.offset.toFixed(2) + '%';
    }

    sliderMousemove(e) {
        const state = this.state;
        if (!this.isDown) { return; }
        this.position = this.layer(e)[state.mode];
        state.offset = this.calculateOffset(this.position);
        state.value = this.percentageFromOffset(state.offset);
        this.slidingThing.style[state.mode == 'X' ? 'left' : 'bottom'] = state.offset.toFixed(2) + '%';
    }

    sliderMouseup() { this.isDown = false }

    resize() {
        this.state.mode = body.clientWidth <= 768 ? 'Y' : 'X';
        this.state.offset = this.offsetFromPercentage(this.state.value);
        this.slidingThing.style[this.state.mode == 'X' ? 'left' : 'bottom'] = this.state.offset.toFixed(2) + '%';
        this.slidingThing.style[this.state.mode == 'Y' ? 'left' : 'bottom'] = 'auto';
    }
}

module.exports = Slider;