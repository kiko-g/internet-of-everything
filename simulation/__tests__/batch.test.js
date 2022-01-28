
import Machine from "../Machine.js"
import Batch from "../Batch.js"
import Sensor from "../Sensor.js"


let sensor1= new Sensor("S1", "temperature", 500, {"s1": {"min":10, "max":20, "avg":14,"standardDeviation":5},"s2": {"min":10, "max":20, "avg":14,"standardDeviation":5}})

let machine1 =new Machine("machine1")
let batch= new Batch("machine1")

machine1.addSensor(sensor1);
machine1.setNextMachineID("m2")
machine1.setDefectProbability(0.1)
machine1.setTimePerBatch(30)

test('Constructor', async () => {
    let n=Batch.count;
    expect(batch.getCurrentMachineID()).toMatch("machine1")
    expect(batch.getID()).toEqual(n)
    expect(batch.hasDefect).toBeFalsy();
})



test('Treat batch', async () => {
    machine1.setTimePerBatch(30)
    machine1.treatBatch(batch)
    expect(machine1.totalWorkingTime).toEqual(machine1.getTimePerBatch())
    expect(batch.currentMachineID).toMatch("m2")
    

})

test('Representation', async () => {
    let brep=batch.getRepresentation()    
    expect(brep.id).toEqual(batch.getID())
    expect(brep.hasDefect).toBeFalsy()
 

})