export default class Machine {
  //TODO: Add more arguments based on the factory.json
  constructor(machineID) {
    this.id = machineID
    this.sensors = []
  }

  setStatus(status) {
    this.status = status
  }

  setDefectProbability(defProb) {
    this.defectProbability = defProb
  }

  setInput(inp) {
    this.input = inp
  }

  setOutput(out) {
    this.output = out
  }

  setTimePerBatch(time){
    this.timePerBatch =time;
  }
  setNextMachineID(id) {
    this.nextMachineID = id
  }

  addSensor(sensor) {
    this.sensors.push(sensor)
  }

  update() {
    console.log("updating")
  }

  //TODO: Add more information about the machine
  getRepresentation() {
    let representation = `I'm okay;`
    return representation
  }
}
