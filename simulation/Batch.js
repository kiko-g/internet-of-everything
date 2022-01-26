export default class Batch {
  // Save the number of batches until this moment
  static count = 0
  constructor(currentMachineID) {
    // Batch ID
    this.id = ++this.constructor.count
    // ID of machine the batch is on
    this.currentMachineID = currentMachineID
    // Boolean representing the this batch has defect
    this.hasDefect = false
    // Machine that produced a defect
    this.machineDefect = "null"
    // Name of the current material
    this.materialName = ""
  }

  /**
   * @returns Batch's ID
   */
  getID() {
    return this.id
  }

  /**
   * @returns Current Machine's ID
   */
  getCurrentMachineID() {
    return this.currentMachineID
  }

  /**
   * Sets the current Machine ID
   * @param  machineID - id of the next machine
   */
  setCurrentMachineID(machineID) {
    this.currentMachineID = machineID
  }

  /**
   * Set the name of the machine that gave this batch a defect
   * @param  name - machine's name
   */
  setMachineDefect(name) {
    this.machineDefect = name
  }

  /**
   * Sets if the batch has defect or not
   * @param  name - boolean representing the the batch has defect or not
   */
  setHasDefect(defect) {
    this.hasDefect = defect
  }

  /**
   * Set the name of the material of this batch
   * @param  name - material's name
   */
  setMaterialName(name) {
    this.materialName = name
  }

  /**
   * Generates the JSON representation of this batch
   * @returns 
   */
  getRepresentation() {
    
    let representation = {
      // Batch's ID
      id: this.id,
      // Tell if the batch has defect or not
      hasDefect: this.hasDefect,
      // Batch's material name
      materialName: this.materialName,
    }

    return representation
  }
}
