

export default class Sensor {
    
    constructor(id, type, attributes) {
      this.id = id;
      this.type = type;
      this.attributes = attributes;
     
    }

    update(){
        for(var attribute in this.attributes){
            attribute.generateNewValue();
        }
    }




}
