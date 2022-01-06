import Batch from "./Batch.js"

export default class Machine {

  constructor(machineID) {
    this.id = machineID
    this.sensors = []
    this.isOccupied = false;
    this.workingTime = 0;
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

  update() {
    console.log("updating")
  }

  treatBatch(batch){
    let rand = Math.floor(Math.random() * 101);
    this.workingTime += this.timePerBatch;
    if(rand < this.defectProbability){
      batch.setHasDefect(true);
    }

    batch.setMaterialName(this.output);
    batch.setCurrentMachineID(this.nextMachineID);
    
    this.isOccupied = true;

    return batch;
  }

  //TODO: Add more information about the machine
  getRepresentation() {

   
    let sensorsDict=[]
    for (let i = 0; i < this.sensors.length; i++) {
      let attr={}
      
      for (let j = 0; j < this.sensors[i].attributes.length; j++) {
        let name=this.sensors[i].attributes[j].name
        let value=this.sensors[i].attributes[j].value
        attr[name]=value
        
      }
      //,"updateInterval":this.sensors[i].updateInterval
      let sensor = {"id":this.sensors[i].id, "type":this.sensors[i].type,"attributes":attr}
      sensorsDict.push(sensor);
    }
    let representation={"id":this.id,"status": this.status, "sensors":sensorsDict}
    return JSON.stringify(representation)
  }
}
