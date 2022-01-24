const Graph = require('graph');
const Machine = require('./Machine.js');
const Position2D = require('./Position2D.js');

class FactoryFloor {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.machines = new Graph.Graph();
        this.machines_map = [];
    }

    isValidMachineAddition(machine) {
        const machine_id = machine.getID();
        const is_valid_id = !(machine_id in this.machines_map);
        const is_valid_position = machine.getPosition.isInside(new Position2D(0,0), new Position2D(this.width, this.height));

        return is_valid_id && is_valid_position;
    }

    addMachine(machine, incoming_machine_ids, outgoing_machine_ids) {
        if (!this.isValidMachineAddition(machine))
            return;

        const machine_id = machine.getID();
        this.machines_map[machine_id] = machine;

        if (incoming_machine_ids)
            incoming_machine_ids.forEach(id => {
                this.machines.set(id, machine_id);
            });
        
        if (outgoing_machine_ids)
            outgoing_machine_ids.forEach(id => {
                this.machines.set(machine_id, id);
            });
    }

    areMachinesConnected(machine_id1, machine_id2) {
        return this.machines.has(machine_id1, machine_id2);
    }

    getMachineConnections(machine_id) {
        return this.machines.adj(machine_id);
    }

    getMachine(machine_id) {
        return this.machines_map[machine_id];
    }

    get getMachines(){
        return this.machines_map;
    }
}

module.exports = FactoryFloor