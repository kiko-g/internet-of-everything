import Machine from "./Machine.js"
import Batch from "./Batch.js"
import JSONParser from "./JSONParser.js"

export default class Simulation {
  constructor(file, piecesQty) {
    this.file = file
    this.piecesQty = piecesQty
    this.machines = {}
    this.completedBatches = [];
  }

  run() {
    let parser = new JSONParser();
    let parsedJson = parser.parse(this.file)
    
    this.nBatches = parsedJson[0];
    this.startMachineID = parsedJson[1];
    this.machines = parsedJson[2];
    this.factoryWorkingTime = 0;

    this.createBatches();
    console.log(this.machines[0].getRepresentation);
    while(Object.values(this.batches).length > 0){
      let batchToDelete = -1;
      let maxTimePerBatch = 0;
      this.iterations++;

      for (const [batchID, batch] of Object.entries(this.batches)){

        let batchMachine = this.machines[batch.currentMachineID];

        if(batchMachine.isOccupied){
          continue;
        }

        let newBatch = batchMachine.treatBatch(batch);

        if(batchMachine.getTimePerBatch() > maxTimePerBatch){
          maxTimePerBatch = batchMachine.getTimePerBatch();
        }

        //end of production line
        if(newBatch.getCurrentMachineID() === ""){
          this.completedBatches.push(newBatch);
          batchToDelete = batchID;
        }
        else{
          this.batches[batchID] = newBatch;
        }

      }

      this.factoryWorkingTime += maxTimePerBatch;

      if(batchToDelete != -1){
        delete this.batches[batchToDelete]

      }

      // Unoccupy machines
      for(const machine of Object.values(this.machines)){
        machine.toggleOccupationOff();
      }

    }
    console.log(this.factoryWorkingTime);
    //TODO: Transform Machine Representation into JSON
    return (
      "Machine final state after cutting " +
      this.piecesQty +
      " pieces:\n" +
      this.machines[0].getRepresentation()
    )
  }

  createBatches(){
    this.batches = {};
    for(let i = 0; i < this.nBatches; i++){
      let batch = new Batch(this.startMachineID);
      this.batches[batch.getID()] = batch;
    }
  }
}
