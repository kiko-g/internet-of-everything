import SensorAttribute from "./SensorAttribute.js"

export default class Sensor {
  constructor(id, type, attributes) {
    this.id = id
    this.type = type
    this.attributes = []

    for (const [attributeName, attributeInfo] of Object.entries(attributes)) {
      this.attributes.push(
        new SensorAttribute(
          attributeName,
          attributeInfo.min,
          attributeInfo.max,
          attributeInfo.avg,
          attributeInfo.standardDeviation
        )
      )
    }
  }

  update() {
    for (let i = 0; i < this.attributes.length; i++) {
      this.attributes[i].generateNewValue()
    }
  }
}
