
import Sensor from "../Sensor.js"


let sensor1= new Sensor("S1", "temperature", 500, {"s1": {"min":10, "max":20, "avg":14,"standardDeviation":5},"s2": {"min":10, "max":20, "avg":14,"standardDeviation":5}})

test('Constructor', async () => {
    expect(sensor1.id).toMatch("S1")
    expect(sensor1.type).toMatch("temperature")
    expect(sensor1.updateInterval).toBe(500)
    expect(sensor1.attributes[0].avg).toBe(14)
    expect(sensor1.attributes[1].name).toBe("s2")
   
    
})


test('Update Interval', async () => {
    expect(sensor1.updateInterval).toEqual(sensor1.getUpdateInterval())

})

test('Update', async () => {
    sensor1.update(600)
    expect(sensor1.timeAfterLastUpdate).toBe(100)

    sensor1.update(200)
    expect(sensor1.timeAfterLastUpdate).toBe(300)

})
