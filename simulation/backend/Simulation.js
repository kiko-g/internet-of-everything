import CuttingMachine from "./CuttingMachine.js";

export default class Simulation {
  constructor(file, piecesQty) {
    this.file = file;
    this.piecesQty = piecesQty;
    this.machines = {};
  }

  run() {
    //TODO: Machines must be read from a JSON
    let cuttingMachine = new CuttingMachine(60, 0.5, 1);
    this.machines[1] = cuttingMachine;

    for (let i = 0; i < this.piecesQty; i++) {
      for (const value of Object.values(this.machines)) {
        value.update();
      }
    }

    //TODO: Transform Machine Representation into JSON
    return (
      "Machine final state after cutting " +
      this.piecesQty +
      " pieces:\n" +
      cuttingMachine.getRepresentation()
    );
  }
}
