export default class CuttingMachine {
    constructor(temperature, temperatureVariation, speed) {
        this.speed = speed;
        this.temperature = temperature;
        this.temperatureVariation = temperatureVariation;
    }

    update() {
        this.temperature += this.temperatureVariation;
    }

    getRepresentation() {
        let representation = ` - Temperature:  ${this.temperature}C;`;
        return representation;
    }
}
