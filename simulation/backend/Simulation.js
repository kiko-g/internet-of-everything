import Machine from "./Machine.js"
import Batch from "./Batch.js"
import JSONParser from "./JSONParser.js"

export default class Simulation {
  constructor(file) {
    this.file = file
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

    let response = this.createFactoryRepresentation()

    return JSON.parse(response)
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
    let batchesToDelete = []

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
      if (newBatch.getCurrentMachineID() === "null" || newBatch.hasDefect) {
        this.completedBatches.push(newBatch)
        batchesToDelete.push(batchID)
      } else {
        this.batches[batchID] = newBatch
      }
    }

    if (batchesToDelete.length != 0) {
      for (let i = 0; i < batchesToDelete.length; i++) {
        delete this.batches[batchesToDelete[i]]
      }
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

  createFactoryRepresentation() {
    let representation = {
      nBatches: this.nBatches,
      startMachineID: this.startMachineID,
      totalFactoryRuntime: this.factoryWorkingTime,
    }
    let machines = []
    for (const machine of Object.values(this.machines)) {
      machines.push(machine.getRepresentation())
    }

    let batches = []
    for (let i = 0; i < this.completedBatches; i++) {
      batches.push(this.completedBatches[i].getRepresentation())
    }
    representation["machines"] = machines
    representation["batches"] = batches

    return JSON.stringify(representation)
  }
}
