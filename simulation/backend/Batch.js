

export default class Batch {
    static count=0;
    constructor(currentMachineID) {
        this.id = ++this.constructor.count;

        this.currentMachineID=currentMachineID;
        this.hasDefect=false;
        this.materialName='' //TODO: add material
        
    }

    update() {
        
    }
}
