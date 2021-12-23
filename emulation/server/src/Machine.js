const Position2D = require('./Position2D');

class Machine {
    constructor(id, x, y) {
        this.id = id;
        this.position = new Position2D(x, y);
    }

    getID() {
        return this.id;
    }

    getPosition() {
        return this.position;
    }
}

module.exports = Machine