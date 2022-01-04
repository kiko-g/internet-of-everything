export default class Machine {
  //TODO: Add more arguments based on the factory.json
  constructor(machineID) {
    this.id = id;
    this.sensors = []
  }

  setStatus(status){
    this.status = status;
  }

  setDefectProbability(defProb){
    this.defectProbability = defProb;
  }

  setInput(inp){
    this.input = inp;
  }

  setOutput(out){
    this.output = out;
  }

  setNextMachineID(id){
    this.nextMachineID = id;
  }

  addSensor(sensor){
    this.sensors.push(sensor);
  }

  update() {
    this.temperature += this.temperatureVariation;
  }

  //TODO: Add more information about the machine
  getRepresentation() {
    let representation = ` - Temperature:  ${this.temperature}C;`;
    return representation;
  }
}
