export default class CuttingMachine {
    //TODO: Add more arguments based on the factory.json
    constructor(temperature, temperatureVariation, speed) {
        this.speed = speed;
        this.temperature = temperature;
        this.temperatureVariation = temperatureVariation;
    }

    update() {
        this.temperature += this.temperatureVariation;
    }

    //TODO: Add more information about the machine
    getRepresentation() {
        let representation = ` - Temperature:  ${this.temperature}C;`;
        return representation;
    }
}
