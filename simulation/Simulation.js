import Batch from "./Batch.js"
import JSONParser from "./JSONParser.js"

export default class Simulation {
  /**
   * 
   * @param {String} file - JSON file with the factory initial configuration
   */
  constructor(file) {
    this.file = file

    this.machines = {}            // Dictionary of all the machine in the factory. Key --> MachineID, Value --> Machine Object
    this.completedBatches = []    // Array where we will add the batches has they finish (either but getting to the last machine or they have a defect)
  }

  /**
   * Simulates the behaviour of the factory until all batches have reached the end of the produciton line
   * @returns JSON representation of the final state of the factory
   */
  run() {
    // Parse all the factory objects based on the given JSON file
    let parser = new JSONParser()
    let parsedJson = parser.parse(this.file)

    // Initiate all factory objects with the parsed information
    this.nBatches = parsedJson[0]         // Total number of batches that enter the factory
    this.startMachineID = parsedJson[1]   // First Machine of the Production Line
    this.machines = parsedJson[2]         // All the machines in the production line
    this.factoryWorkingTime = 0           // Total working time of all the machine in the factory (from the start until the last machine stops)

    // Create all the nBatches batches
    this.createBatches()

    // While there are batches to handle, simulate a factory cycle
    while (Object.values(this.batches).length > 0) {
      let simulationDuration = this.simulateFactoryCycle()

      // Add the total time of the cycle to the factory time
      this.factoryWorkingTime += simulationDuration

      // Simulate all the sensors from all the machines based on the time it has passed
      this.simulateSensorsBehaviour(simulationDuration)
    }

    // Generate the JSON representation of the factory state
    let response = this.createFactoryRepresentation()

    return JSON.parse(response)
  }

  /**
   * Iterate over all the machines and their sensors and update those sensors
   * @param {float} duration 
   */
  simulateSensorsBehaviour(duration) {
    for (const machine of Object.values(this.machines)) {
      // Iterate over the machine's sensors and update them
      for (let i = 0; i < machine.getSensors().length; i++) {
        let sensor = machine.getSensors()[i]

        sensor.update(duration)
      }

      // Unoccupy machine
      machine.toggleOccupationOff()
    }
  }

  /**
   * Every batch is moved to the next machine in the factory floor. Then it is handled and checked for defects
   * @returns the number of time units this cycle took 
   */
  simulateFactoryCycle() {
    let maxTimePerBatch = 0   // MaxTimePerBatch will be equivalent to the total time of this cycle since a cycle ends when the last machine ended
    let batchesToDelete = []  // Array that will contain all the batches that have finished their journey

    for (const [batchID, batch] of Object.entries(this.batches)) {
      // Get which machine the batch should go to
      let batchMachine = this.machines[batch.currentMachineID]

      // If the machine is occupied then the batch will have to wait for the next cycle
      if (batchMachine.isOccupied) {
        continue
      }

      // Let the machine handle the batch
      let newBatch = batchMachine.treatBatch(batch)

      // Check if this is the highest time per batch yet
      if (batchMachine.getTimePerBatch() > maxTimePerBatch) {
        maxTimePerBatch = batchMachine.getTimePerBatch()
      }

      //  If the batch has finished their journey (either by reaching the last machine or by having a defect) remove them from the factory floor
      if (newBatch.getCurrentMachineID() === "null" || newBatch.hasDefect) {
        this.completedBatches.push(newBatch)

        batchesToDelete.push(batchID)
      }
      // Else add the new batch back to the factory floor 
      else {
        this.batches[batchID] = newBatch
      }
    }

    // Remove all the batches that have finished their journey from the factory floor
    if (batchesToDelete.length != 0) {
      for (let i = 0; i < batchesToDelete.length; i++) {
        delete this.batches[batchesToDelete[i]]
      }
    }

    return maxTimePerBatch
  }

  /**
   * Generates all the batches that should enter the factory floor
   */
  createBatches() {
    // Initialize batch dictionary
    this.batches = {}       // Key --> batch ID, Value --> batch Object

    for (let i = 0; i < this.nBatches; i++) {
      let batch = new Batch(this.startMachineID)
      this.batches[batch.getID()] = batch
    }
  }

  /**
   * Calculates the percentage of batches that have a defect
   * @returns percentage of the batches that got a defect
   */
  calculateDefectPercentage(){
    let failedBatches = 0;

    for(let i = 0; i < this.completedBatches.length; i++){
      if(this.completedBatches[i].hasDefect){
        failedBatches++;
      }
    }
 
    return (failedBatches / this.nBatches) * 100

  }

  /**
   * Create a JSON representation containing all the information about the factory (machines and batches)
   * @returns JSON representation of the final state of the factory
   */
  createFactoryRepresentation() {
    // Create Base JSON representation
    let representation = {
      // Total number of batches that entered the factory
      nBatches: this.nBatches,
      // First machine on the factory floor
      startMachineID: this.startMachineID,
      // Total number of time units the factory worked foir
      totalFactoryRuntime: this.factoryWorkingTime,
      // Percentage of the batches that got a defect
      percentageDefect: this.calculateDefectPercentage(),
    }

    // Generate the representation of all the machines
    let machines = []
    for (const machine of Object.values(this.machines)) {
      machines.push(machine.getRepresentation())
    }

    // Generate the representation of all the batches
    let batches = []
    for (let i = 0; i < this.completedBatches.length; i++) {
      batches.push(this.completedBatches[i].getRepresentation())
    }

    // Append the representation of all the machines and all the batches
    representation["machines"] = machines
    representation["batches"] = batches

    return JSON.stringify(representation)
  }
}
