

export default class Machine {
  /**
    Machine Constructors
    It creates the sensors array where all the machine's sensor will be saved
    Initializes basic global variables
    @param machineID - ID of the machine
  */
  constructor(machineID) {
    this.id = machineID
    this.sensors = []
    this.isOccupied = false;    // Boolean representing if the machine is already processing a batch
    this.totalWorkingTime = 0;  // Float representing the total number of time units that the machine has worked for
  }

  /**
   * 
   * @param status - can be either 0 or 1, representing if the machine is online (0) or offline (1)
   */
  setStatus(status) {
    this.status = status
  }

  /**
   * 
   * @param defProb - probability from 0-100 of a batch having a defect after passing through the machine 
   */
  setDefectProbability(defProb) {
    this.defectProbability = defProb
  }

  /**
   * @param inp - name of the input material 
   */
  setInput(inp) {
    this.input = inp
  }

  /**
   * @param out - name of the output material 
   */
  setOutput(out) {
    this.output = out
  }

  /**
   * 
   * @param time - float representing the number of unit times the machine takes to handle a batch
   */
  setTimePerBatch(time){
    this.timePerBatch =time;
  }

  /**
   * @param id - id of the next machine that the batch should be sent to
   */
  setNextMachineID(id) {
    this.nextMachineID = id
  }

  /**
   * 
   * @param {Sensor} sensor - represents one of the machine's sensor
   */
  addSensor(sensor) {
    this.sensors.push(sensor)
  }

  /**
   * Use to reset the machine after it has handled a batch
   */
  toggleOccupationOff(){
    this.isOccupied = false;
  }

  /** 
   * @returns total number of times units that the machine needs to handle a batch
   */
  getTimePerBatch(){
    return this.timePerBatch;
  }

  /** 
   * @returns array containing all of the machine's sensors
   */
  getSensors(){
    return this.sensors;
  }

  /** 
   * @returns 0 or 1 representing the machine status
   */
  getStatus(){
    return this.status;
  }

  /**
   * Checks wheter the batch will have a defect and changes the batch properties
   * @param {Batch} batch - represents the batch that the machine must handle
   * @returns processed batch
   */
  treatBatch(batch){
    // Add the time the machine needs to handle this batch to the total working time
    this.totalWorkingTime += this.timePerBatch;

    // Check if the batch will have a defect
    let rand = Math.random() * 100

    if (rand < this.defectProbability) {
      // Save the machine that gave the batch a defect
      batch.setHasDefect(true)
      batch.setMachineDefect(this.id)

      // Increment the number of products this machine has created with defect
      this.producedDefect++
    }

    // Update the batch with the next machine to go and it's new material name
    batch.setMaterialName(this.output)
    batch.setCurrentMachineID(this.nextMachineID)

    this.isOccupied = true

    return batch
  }

  /**
   * Creates a JSON representation of this machine
   * @returns json representation of this machine
   */
  getRepresentation() {
    let sensorsDict = []

    // For each sensor, convert it to JSON
    for (let i = 0; i < this.sensors.length; i++) {
      let attr = {}
      
      // Save the Attributes and their value in a dictionary
      for (let j = 0; j < this.sensors[i].attributes.length; j++) {
        let name = this.sensors[i].attributes[j].name
        let value = this.sensors[i].attributes[j].value
        attr[name] = value
      }

      // Create a JSON representation of the sensor
      let sensor = {
        // Sensor's ID
        id: this.sensors[i].id,
        // Number of times it has failed
        failureTimes: this.sensors[i].failureTimes,
        // Interval for which the sensor is updated
        updateInterval: this.sensors[i].updateInterval,
        // Type of sensor
        type: this.sensors[i].type,
        // All the attributes of the sensor
        attributes: attr,
      }

      // Save the sensor in an array
      sensorsDict.push(sensor)
    }

    // Create the JSON representation for this machine
    let representation = {
      // Machine's ID
      id: this.id,
      // Machine's Status
      status: this.status,
      // Number of time units the machine has worked for
      totalWorkingTime: this.totalWorkingTime,
      // Number of batches this machine has created with defect
      defectNumber: this.producedDefect,
      // Information about all the machine's sensors
      sensors: sensorsDict,
    }

    // Return the JSON representation
    return representation
  }
}
