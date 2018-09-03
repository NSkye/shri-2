'use strict';

class Dial {
    constructor(dial, initialValue) {
        this.arrow = [...dial.children].find(child => [...child.classList].find(cl => cl == 'dial__arrow'));
        this.dialPartsRaw = [...dial.children].filter(child => [...child.classList].find(cl => cl == 'dial__part'));
        this.dialParts = this.dialPartsRaw.map((dp, i) =>{
            const position = dp.getBoundingClientRect();
            return { 
                number: i, 
                angle: window.getComputedStyle(dp).getPropertyValue('transform'), 
                position: {
                    x: position.left,
                    y: position.top
                } 
            }
        });

        this.state = {
            minValue: 0,
            maxValue: 27,
            value: initialValue,
            currentPartNumber: 0
        }
        this.state.currentPartNumber = this.setPosition(this.calculatePartFromValue(initialValue));
        this.turnArrow();
    }

    calculatePartFromValue(value) {
        const minValue = this.state.minValue;
        const maxValue = this.state.maxValue;
        const range = maxValue - minValue;
        const offsettedValue = value - Math.abs(minValue);
        const partCost = range/this.dialParts.length;
        return Math.round(offsettedValue/partCost);
    }

    setPosition(partNumber) {
        if (partNumber > this.state.currentPartNumber) {
            for (let i = this.state.currentPartNumber; i <= partNumber; i++) {
                this.dialPartsRaw[i].classList.add('dial__part--active');
            }
        } else {
            for (let i = partNumber; i > this.state.currentPartNumber; i--) {
                this.dialPartsRaw[i].classList.remove('dial__part--active');
            }
        }
        return partNumber;
    }

    turnArrow() {
        const { angle } = this.dialParts[this.state.currentPartNumber];
        this.arrow.style.transform = angle;
    }

    calculateValueFromPart(currentPartNumber, partTurns) {
        const { minValue, maxValue } = this.state;
        const range = maxValue - minValue;
        const partCost = range/partTurns.length;
        const valueInRange = currentPartNumber * partCost;
        const actualValue = valueInRange - minValue;
        const roundedValue = Math.round(actualValue);
        const displayValue = roundedValue > 0 ? `+${roundedValue}` : roundedValue < 0 ? `-${roundedValue}` : roundedValue;
        return {
            actualValue,
            displayValue
        }
    }
}

module.exports = Dial;