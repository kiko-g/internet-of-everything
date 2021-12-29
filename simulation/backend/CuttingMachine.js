export default class CuttingMachine {
  //TODO: Add more arguments based on the factory.json
  constructor(id, readingTime, links) {
    this.id = id;
    this.readingTime = readingTime;
    this.links = links;
    this.temperatureVariation = 0.1;
  }

  setVolt(volt){
    this.volt = volt;
  }
  
  setName(name){
    this.name = name;
  }

  setSpeed(speed){
    this.speed=speed;
  }
  
  setTemperature(temperature){
    this.temperature=temperature;
  }

  setPiecesProduced(piecesProduced){
    this.piecesProduced = piecesProduced;
  }
  
  setStatus(status){
    this.status=status;
  }
   
  setVibration(vibration){
    this.vibration = vibration;
  }
  
  setPressure(pressure){
    this.pressure = pressure;
  }
  
  setRotate(rotate){
    this.rotate = rotate;
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
