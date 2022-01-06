

export default class Batch {
    static count=0;
    constructor(currentMachineID) {
        this.id = ++this.constructor.count;

        this.currentMachineID=currentMachineID;
        this.hasDefect=false;
        this.materialName='' //TODO: add material
        
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

    setHasDefect(defect){
        this.hasDefect = defect;
    }

    setMaterialName(name){
        this.materialName = name;
    }

    


}
