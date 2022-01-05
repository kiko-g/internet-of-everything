

export default class Batch {
    static count=0;
    constructor(currentMachineID) {
        this.id = ++this.constructor.count;
        console.log(this.id);
        this.currentMachineID=currentMachineID;
        this.hasDefect=false;
        this.materialName='' //TODO: add material
        
    }

    update() {
        
    }
}
