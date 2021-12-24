import CuttingMachine from "./CuttingMachine.js";
import JSONParser from "./JSONParser.js";

export default class Simulation {
  constructor(file, piecesQty) {
    this.file = file;
    this.piecesQty = piecesQty;
    this.machines = {};
  }

  run() {
    
    let jsonParser = new JSONParser();
    this.machines = jsonParser.parse(this.file);

    for (let i = 0; i < this.piecesQty; i++) {  // stub 
      for (const value of Object.values(this.machines)) {
        value.update();
      }
    }

    //TODO: Transform Machine Representation into JSON
    return (
      "Machine final state after cutting " +
      this.piecesQty +
      " pieces:\n" +
      this.machines[0].getRepresentation()
    );
  }
}
