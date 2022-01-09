

export default class Batch {
    static count=0;
    constructor(currentMachineID) {
        this.id = ++this.constructor.count;

        this.currentMachineID=currentMachineID;
        this.hasDefect=false;
        this.machineDefect = "null";
        this.materialName=''
        
    }

    getID(){
        return this.id;
    }

    getCurrentMachineID(){
        return this.currentMachineID;
    }

    setCurrentMachineID(machineID){
        this.currentMachineID = machineID;
    }

    setMachineDefect(name){
        this.machineDefect = name;
    }

    setHasDefect(defect){
        this.hasDefect = defect;
    }

    setMaterialName(name){
        this.materialName = name;
    }

    getRepresentation() {
        let representation={"id":this.id,"hasDefect": this.hasDefect, "materialName":this.materialName}
        return representation
      }


}
