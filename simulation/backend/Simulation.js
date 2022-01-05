import Machine from "./Machine.js"
import Batch from "./Batch.js"
import JSONParser from "./JSONParser.js"
export default class Simulation {
  constructor(file, piecesQty) {
    this.file = file
    this.piecesQty = piecesQty
    this.machines = {}
  }

  run() {
    let parser = new JSONParser();
    let parsedJson = parser.parse(this.file)
    
    this.nBatches = parsedJson[0];
    this.startMachineID = parsedJson[1];
    this.machines = parsedJson[2];

    this.createBatches();

    // for (let i = 0; i < this.piecesQty; i++) {  // stub
    //   for (const value of Object.values(this.machines)) {
    //     value.update();
    //   }
    // }

    //TODO: Transform Machine Representation into JSON
    return (
      "Machine final state after cutting " +
      this.piecesQty +
      " pieces:\n" +
      this.machines[0].getRepresentation()
    )
  }

  createBatches(){
    this.batches = [];
    for(let i = 0; i < this.nBatches; i++){
      this.batches.push(new Batch(this.startMachineID));
    }
  }
}
