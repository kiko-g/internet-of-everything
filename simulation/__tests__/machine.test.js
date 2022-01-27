
import Machine from "../Machine.js"
import Batch from "../Batch.js"
import Sensor from "../Sensor.js"


let sensor1= new Sensor("S1", "temperature", 500, {"s1": {"min":10, "max":20, "avg":14,"standardDeviation":5},"s2": {"min":10, "max":20, "avg":14,"standardDeviation":5}})

let machine1 =new Machine("machine1")
let batch= new Batch("s1")

test('Constructor', async () => {
    expect(machine1.id).toMatch("machine1")
    expect(machine1.sensors).toEqual([])
    machine1.addSensor(sensor1);
    expect(machine1.getSensors().length).toEqual(1)

})

test('Attributes', async () => {
    machine1.setStatus(1)
    machine1.setNextMachineID("m2")
    expect(machine1.status).toEqual(1)
    machine1.setDefectProbability(0.1)
    expect(machine1.status).toEqual(1)
    

})

test('Treat batch', async () => {
    machine1.setTimePerBatch(30)
    machine1.treatBatch(batch)
    expect(machine1.totalWorkingTime).toEqual(machine1.getTimePerBatch())
    expect(batch.currentMachineID).toMatch("m2")
    

})

test('Representation', async () => {
    let machinerep=machine1.getRepresentation()

    
    expect(machinerep.id).toMatch("machine1")
    expect(machinerep.totalWorkingTime).toEqual(30)
    expect(machinerep.sensors.length).toEqual(1)

})