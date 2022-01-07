const Position2D = require('./Position2D');
const Sensor = require('./Sensors/Sensor');

class Machine {
    constructor(id, x, y) {
        this.id = id;
        this.position = new Position2D(x, y);
        // Data structure for sensors
    }

    getID() {
        return this.id;
    }

    getPosition() {
        return this.position;
    }
}

module.exports = Machine