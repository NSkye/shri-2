'use strict';

function findDistance(x1,y1,x2,y2) {
    return Math.pow((Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)), 0.5)
}

class Dial {
    constructor(dial, initialValue) {
        // Получаем ссылки на нужные DOM-объекты
        this.dial = dial;
        this.dialCover = [...dial.children].find(child => [...child.classList].find(cl => cl == 'dial__cover'));
        this.arrow = [...dial.children].find(child => [...child.classList].find(cl => cl == 'dial__arrow'));
        this.dialPartsRaw = [...dial.children].filter(child => [...child.classList].find(cl => cl == 'dial__part'));

        // Формируем массив с информацией о делениях
        this.dialParts = this.dialPartsRaw.map((dp, i) =>{
            const tip = [...dp.children].find(child => [...child.classList].find(cl => cl == 'dial__part-tip'));
            const position = tip.getBoundingClientRect();
            return { 
                number: i, 
                angle: window.getComputedStyle(dp).getPropertyValue('transform'),
                tip,
                position: {
                    x: position.left,
                    y: position.top
                } 
            }
        });

        // Устанавливаем состояние
        this.state = {
            minValue: 0,
            maxValue: 27,
            value: initialValue,
            currentPartNumber: 0
        }

        // Устанавливаем значение
        this.setValue(initialValue);

        // Выставляем листенеры
        this.isDown = false;
        this.dialListeners = [
            [ 'mousedown', this.onMousedown ],
            [ 'mousemove', this.onMousemove ],
            [ 'mouseup', this.onMouseup ],
            [ 'touchstart', this.handleEvent ],
            [ 'touchmove', this.handleEvent ]
        ].map(item => {
            const listener = item[1].bind(this);
            this.dial.addEventListener(item[0], listener);
            return [ item[0], listener ];
        });

        this.otherListeners = [
            [ window, 'resize', this.resize ]
        ].map(item => {
            const listener = item[2].bind(this);
            item[0].addEventListener(item[1], listener);
            return [ item[0], item[1], listener ];
        });
    }

    /**
     * Снимает листенеры событий
     */
    destroy() {
        this.dialListeners.map(item => {
            this.dial.removeEventListener(item[0], item[1]);
        });
        this.otherListeners.map(item => {
            item[0].removeEventListener(item[1], item[2]);
        });
    }

    /**
     * Заново высчитывает положение делений на экране при изменении размеров окна
     */
    resize() {
        this.dialParts.map((dp, i) => {
            const position = dp.tip.getBoundingClientRect();
            dp.position.x = position.left;
            dp.position.y = position.top;
        });
    }

    /**
     * Определяет какое деление соответствует введенному значению
     * @param {Number} value значение
     * @returns {Number}
     */
    calculatePartFromValue(value) {
        const minValue = this.state.minValue;
        const maxValue = this.state.maxValue;
        const range = maxValue - minValue;
        const offsettedValue = value - Math.abs(minValue);
        const partCost = range/this.dialParts.length;
        return Math.round(offsettedValue/partCost);
    }

    /**
     * Закрашивает все деления до указанного включительно в активный цвет, закрашивает все деления после указанного в неактивный цвет.
     * @param {Number} partNumber номер деления
     * @returns {Number}
     */
    setPosition(partNumber) {
        if (partNumber > this.state.currentPartNumber) {
            for (let i = this.state.currentPartNumber; i <= partNumber; i++) {
                this.dialPartsRaw[i].classList.add('dial__part--active');
            }
        } else if (partNumber < this.state.currentPartNumber) {
            for (let i = this.state.currentPartNumber; i > partNumber; i--) {
                this.dialPartsRaw[i].classList.remove('dial__part--active');
            }
        }
        return partNumber;
    }

    /**
     * Поворачивает стрелочку на последнее активное деление
     */
    turnArrow() {
        const { angle } = this.dialParts[this.state.currentPartNumber];
        this.arrow.style.transform = angle;
    }

    /**
     * Переводит число в значение, которое будет отображаться пользователю.  
     * Округлено до 0 знаков после запятой, перед положительным значением идет +. 
     * @param {Number} value значение
     * @returns {String}
     */
    valueToDisplayValue(value) {
        const roundedValue = Math.round(value);
        return roundedValue > 0 ? `+${roundedValue}` : `${roundedValue}`;
    }

    /**
     * Определяет текущее значение по количеству активных делений.
     * @param {Number} currentPartNumber текущее активное деление
     * @param {Array} partTurns массив делений
     * @returns {Object}
     */
    calculateValueFromPart(currentPartNumber, partTurns) {
        const { minValue, maxValue } = this.state;
        const range = maxValue - minValue;
        const partCost = range/partTurns.length;
        const valueInRange = currentPartNumber * partCost;
        const actualValue = valueInRange - minValue;
        return {
            actualValue,
            displayValue: this.valueToDisplayValue(actualValue)
        }
    }

    /**
     * Устанавливает значение соответствующее делению
     * @param {Number} partNumber номер деления
     */
    setValueWithPartNumber(partNumber) {
        this.state.currentPartNumber = this.setPosition(partNumber);
        this.turnArrow();
        let values = this.calculateValueFromPart(this.state.currentPartNumber, this.dialParts);
        this.state.value = values.actualValue;
        this.dialCover.innerText = values.displayValue;
    }

    /**
     * Устанавливает указанное значение
     * @param {Number} value 
     */
    setValue(value) {
        this.state.value = value;
        this.state.currentPartNumber = this.setPosition(this.calculatePartFromValue(value));
        this.dialCover.innerText = this.valueToDisplayValue(value);
        this.turnArrow();
    }

    /**
     * Определяет ближайшее деление к месту курсора/касания и устанавливает соответствующее ему значение.
     * @param {Object} e объект DOM-события
     */
    handleEvent(e) {
        let x1 = e.clientX || e.touches[0].clientX;
        let y1 = e.clientY || e.touches[0].clientY;

        let closest = Infinity;
        let closestDialPart = null;

        this.dialParts.map(dp => {
            let x2 = dp.position.x;
            let y2 = dp.position.y;

            let distance = findDistance(x2, y2, x1, y1);

            if (distance > closest) { return; }
            closest = distance;
            closestDialPart = dp.number;
        });

        this.setValueWithPartNumber(closestDialPart);
    }

    onMousedown(e) {
        this.isDown = true;
        this.handleEvent(e);
    }

    onMousemove(e) {
        if (!this.isDown) { return; }
        this.handleEvent(e);
    }

    onMouseup(e) {
        this.isDown = false;
    }
}

module.exports = Dial;