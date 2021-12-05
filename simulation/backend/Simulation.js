import CuttingMachine from "./CuttingMachine.js";

export default class Simulation {
    constructor(file, piecesQty) {
        this.file = file;
        this.piecesQty = piecesQty;
        this.machines = {};
    }

    run() {
        let cuttingMachine = new CuttingMachine(60, 0.5, 1);
        this.machines[1] = cuttingMachine;

        for (let i = 0; i < this.piecesQty; i++) {
            for (const value of Object.values(this.machines)) {
                //console.log(value);
                value.update();
            }
        }

        console.log(
            "Machine final state after cutting " +
                this.piecesQty +
                " pieces:\n" +
                cuttingMachine.getRepresentation()
        );

        return (
            "Machine final state after cutting " +
            this.piecesQty +
            " pieces:\n" +
            cuttingMachine.getRepresentation()
        );
    }

    //TODO: Machines must be read from a JSON

    //TODO: Receive user input from front end

    //TODO: Transform Machine Representation into JSON

    //TODO: Send JSON to the front end
}
