class Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        this.id = id;
        this.minValue = min;
        this.maxValue = max;
        this.avgValue = avg;
        this.standardDeviation = standardDeviation;
    }

    getID() {
        return this.id;
    }

    processData(receivedData) {
        var data = JSON.parse(receivedData);
        console.log(data.values);
    }
}

class EnergySensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    compareValues(received, standard) {
        if(received > standard + standardDeviation){
            console.log("Energy values too high!!!");
        }
        else if(received < standard - standardDeviation){
            console.log("Energy values too low!!!");
        }
    }
}

class MachineOrientationSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    // compareValues(received, standard) {
    //     if(received > standard + standardDeviation){
    //         console.log("Energy values too high!!!");
    //     }
    //     else if(received < standard - standardDeviation){
    //         console.log("Energy values too low!!!");
    //     }
    // }
}

class MachineVelocitySensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    // compareValues(received, standard) {
    //     if(received > standard + standardDeviation){
    //         console.log("Energy values too high!!!");
    //     }
    //     else if(received < standard - standardDeviation){
    //         console.log("Energy values too low!!!");
    //     }
    // }
}

class PositionSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    // compareValues(received, standard) {
    //     if(received > standard + standardDeviation){
    //         console.log("Energy values too high!!!");
    //     }
    //     else if(received < standard - standardDeviation){
    //         console.log("Energy values too low!!!");
    //     }
    // }
}

class ProductionSpeedSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    compareValues(received, standard) {
        if(received > standard + standardDeviation){
            console.log("Procuction speed values too high!!!");
        }
        else if(received < standard - standardDeviation){
            console.log("Production Speed values too low!!!");
        }
    }
}

class QRCodeSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    // compareValues(received, standard) {
    //     if(received > standard + standardDeviation){
    //         console.log("Energy values too high!!!");
    //     }
    //     else if(received < standard - standardDeviation){
    //         console.log("Energy values too low!!!");
    //     }
    // }
}

class TemperatureSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    compareValues(received, standard) {
        if(received > standard + standardDeviation){
            console.log("Temperature values too high!!!");
        }
        else if(received < standard - standardDeviation){
            console.log("Temperature values too low!!!");
        }
    }
}

class VibrationSensor extends Sensor {
    constructor(id, min, max, avg, standardDeviation) {
        super(id, min, max, avg, standardDeviation);
    }

    compareValues(received, standard) {
        if(received > standard + standardDeviation){
            console.log("Vibration values too high!!!");
        }
        else if(received < standard - standardDeviation){
            console.log("Vibration values too low!!!");
        }
    }
}

module.exports = [Sensor, EnergySensor, MachineOrientationSensor, MachineVelocitySensor, PositionSensor, ProductionSpeedSensor, QRCodeSensor, TemperatureSensor, VibrationSensor]
