import SensorAttribute from "../SensorAttribute.js"


let s1=new SensorAttribute("s1", 10, 20, 14,5)



test('Constructor', async () => {
    expect(s1.name).toMatch("s1")
    expect(s1.min).toBe(10)
    expect(s1.max).toBe(20)
    expect(s1.avg).toBe(14)
    expect(s1.stdDeviation).toBe(5)
    expect(s1.value).toBeDefined()
    
})

test('Generate new Value', async () => {
    let prev=s1.getValue()
    s1.generateNewValue()
    expect(s1.value).not.toBe(prev)
})