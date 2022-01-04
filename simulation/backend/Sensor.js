

export default class Sensor {
    
    constructor(id, type, attributes) {
      this.id = id;
      this.type = type;
      this.attributes = attributes;
     
    }

    update(){
        for(let [key, val] of Object.entries(this.attributes)){
            val.generateNewValue();
        }
    }




}
