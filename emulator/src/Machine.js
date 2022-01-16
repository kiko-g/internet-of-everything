const Position2D = require('./Position2D');
const Sensor = require('./Sensors/Sensor');

class Machine {
    constructor(id, x, y) {
        this.id = id;
        this.position = new Position2D(x, y);
        // Data structure for sensors
        this.Sensors = new Array();
    }

    getID() {
        return this.id;
    }

    // get getID() {
    //     return this.id;
    // }

    get getPosition() {
        return this.position;
    }

    get getSensors(){
        return this.Sensors;
    }

    addSensor(sensor) {
        this.Sensors.push(sensor);
    }

    getSensor(sensor) {
        for(let i = 0; i < this.Sensors.length; i++){
            if(this.Sensors[i].getID == sensor){
                return this.Sensors[i];
            }
        }
        return null;
    }
}

module.exports = Machine