class Sensor {
    constructor(id, updateInterval, attributes) {
        this.id = id;
        this.updateInterval = updateInterval;
        this.attributes = attributes;
        this.hasError = false;
    }

    get getID() {
        return this.id;
    }
}

class EnergySensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.energy.max;
        this.min = attributes.energy.min;
        this.avg = attributes.energy.avg;
        this.standardDeviation = attributes.energy.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.energy > this.max || received.energy < this.min){
            this.hasError = true;
            console.log("Error has occured in energy sensor...");
        }
    }
}

class OrientationSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.orientation.max;
        this.min = attributes.orientation.min;
        this.avg = attributes.orientation.avg;
        this.standardDeviation = attributes.orientation.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.orientation > this.max || received.orientation < this.min){
            this.hasError = true;
            console.log("Error has occured in orientation sensor...");
        }
    }
}

class VelocitySensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.velocity.max;
        this.min = attributes.velocity.min;
        this.avg = attributes.velocity.avg;
        this.standardDeviation = attributes.velocity.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.velocity > this.max || received.velocity < this.min){
            this.hasError = true;
            console.log("Error has occured in velocity sensor...");
        }
    }
}

class PositionSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.maxX = attributes.x.max;
        this.minX = attributes.x.min;
        this.avgX = attributes.x.avg;
        this.standardDeviationX = attributes.x.standardDeviation;
        this.maxY = attributes.y.max;
        this.minY = attributes.y.min;
        this.avgY = attributes.y.avg;
        this.standardDeviationY = attributes.y.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        // if(received.vibration > this.max || received.vibration < this.min){
        //     this.hasError = true;
        //     console.log("Error has occured in vibration sensor...");
        // }

        console.log("POSITION SENSOR YET TO BE IMPLEMENTED");
    }
}

class ProductionSpeedSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.productionSpeed.max;
        this.min = attributes.productionSpeed.min;
        this.avg = attributes.productionSpeed.avg;
        this.standardDeviation = attributes.productionSpeed.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.productionSpeed > this.max || received.productionSpeed < this.min){
            this.hasError = true;
            console.log("Error has occured in production speed sensor...");
        }
    }
}

class QRCodeSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.energy.max;
        this.min = attributes.energy.min;
        this.avg = attributes.energy.avg;
        this.standardDeviation = attributes.energy.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        // if(received.vibration > this.max || received.vibration < this.min){
        //     this.hasError = true;
        //     console.log("Error has occured in vibration sensor...");
        // }

        console.log("QR CODE SENSOR YET TO BE IMPLEMENTED");
    }
}

class TemperatureSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.temperature.max;
        this.min = attributes.temperature.min;
        this.avg = attributes.temperature.avg;
        this.standardDeviation = attributes.temperature.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.temperature > this.max || received.temperature < this.min){
            this.hasError = true;
            console.log("Error has occured in temperature sensor...");
        }
    }
}

class VibrationSensor extends Sensor {
    constructor(id, updateInterval, attributes) {
        super(id, updateInterval, attributes);
        
        this.max = attributes.vibration.max;
        this.min = attributes.vibration.min;
        this.avg = attributes.vibration.avg;
        this.standardDeviation = attributes.vibration.standardDeviation;

        delete this.attributes;
    }

    compareValues(received) {
        if(received.vibration > this.max || received.vibration < this.min){
            this.hasError = true;
            console.log("Error has occured in vibration sensor...");
        }
    }
}

module.exports = {Sensor, EnergySensor, OrientationSensor, VelocitySensor, PositionSensor, ProductionSpeedSensor, QRCodeSensor, TemperatureSensor, VibrationSensor}
