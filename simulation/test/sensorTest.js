import SensorAttribute from "./SensorAttribute.js"

let s1=new SensorAttribute("s1", 10, 20, 14,5)



test('Adding two numbers', async () => {
    expect(s1.value).toStrictEqual(10)
    expect(add(100, 200)).toStrictEqual(300)
})