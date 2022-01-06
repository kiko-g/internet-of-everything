import Machine from "./Machine.js"
import Batch from "./Batch.js"
import JSONParser from "./JSONParser.js"

export default class Simulation {
  constructor(file, piecesQty) {
    this.file = file
    this.piecesQty = piecesQty
    this.machines = {}
    this.completedBatches = []
  }

  run() {
    let parser = new JSONParser()
    let parsedJson = parser.parse(this.file)

    this.nBatches = parsedJson[0]
    this.startMachineID = parsedJson[1]
    this.machines = parsedJson[2]
    this.factoryWorkingTime = 0

    this.createBatches()

    while (Object.values(this.batches).length > 0) {
      let simulationDuration = this.simulateFactoryCycle()
      this.factoryWorkingTime += simulationDuration

      this.simulateSensorsBehaviour(simulationDuration)
    }

    console.log(this.machines)
    //TODO: Transform Machine Representation into JSON
    return (
      "Machine final state after cutting " +
      this.piecesQty +
      " pieces:\n" +
      this.machines[0].getRepresentation()
    )
  }

  simulateSensorsBehaviour(duration) {
    for (const machine of Object.values(this.machines)) {

      for (let i = 0; i < machine.getSensors().length; i++) {
        let sensor = machine.getSensors()[i]
  
        sensor.update(duration)

      }

      // Unoccupy machines
      machine.toggleOccupationOff()
    }
  }

  simulateFactoryCycle() {
    let maxTimePerBatch = 0
    let batchToDelete = -1

    for (const [batchID, batch] of Object.entries(this.batches)) {
      let batchMachine = this.machines[batch.currentMachineID]

      if (batchMachine.isOccupied) {
        continue
      }

      let newBatch = batchMachine.treatBatch(batch)

      if (batchMachine.getTimePerBatch() > maxTimePerBatch) {
        maxTimePerBatch = batchMachine.getTimePerBatch()
      }

      //end of production line
      if (newBatch.getCurrentMachineID() === "") {
        this.completedBatches.push(newBatch)
        batchToDelete = batchID
      } else {
        this.batches[batchID] = newBatch
      }
    }

    if (batchToDelete != -1) {
      delete this.batches[batchToDelete]
    }

    return maxTimePerBatch
  }

  createBatches() {
    this.batches = {}
    for (let i = 0; i < this.nBatches; i++) {
      let batch = new Batch(this.startMachineID)
      this.batches[batch.getID()] = batch
    }
  }

  createMachinesRepresentation(){
    representation={batches: this.nBatches, startMachineID: this.startMachineID, totalFactoryRuntime: this.factoryWorkingTime}
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      
    }
  }
}
