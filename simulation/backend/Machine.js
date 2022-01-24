import Batch from "./Batch.js"

export default class Machine {

  constructor(machineID) {
    this.id = machineID
    this.sensors = []
    this.isOccupied = false;
    this.totalWorkingTime = 0;
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

  toggleOccupationOff(){
    this.isOccupied = false;
  }

  getTimePerBatch(){
    return this.timePerBatch;
  }

  getSensors(){
    return this.sensors;
  }

  getStatus(){
    return this.status;
  }

  treatBatch(batch){
    let rand = Math.floor(Math.random() * 101);
    this.totalWorkingTime += this.timePerBatch;

    if(rand < this.defectProbability){
      batch.setHasDefect(true);
      batch.setMachineDefect(this.id)
    }

    batch.setMaterialName(this.output);
    batch.setCurrentMachineID(this.nextMachineID);
    
    this.isOccupied = true;

    return batch;
  }

  getRepresentation() {

    let sensorsDict=[]
    for (let i = 0; i < this.sensors.length; i++) {
      let attr={}
      
      for (let j = 0; j < this.sensors[i].attributes.length; j++) {
        let name=this.sensors[i].attributes[j].name
        let value=this.sensors[i].attributes[j].value
        attr[name]=value
        
      }
      
      let sensor = {"id":this.sensors[i].id,"failureTimes":this.sensors[i].failureTimes, "updateInterval":this.sensors[i].updateInterval, "type":this.sensors[i].type,"attributes":attr}
      sensorsDict.push(sensor);
    }
    let representation={"id":this.id,"status": this.status, "totalWorkingTime":this.totalWorkingTime, "sensors":sensorsDict}
    return representation
  }
}
