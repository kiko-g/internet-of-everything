import SensorAttribute from "./SensorAttribute.js"

export default class Sensor {
  constructor(id, type, updateInterval, attributes) {
    this.id = id
    this.type = type
    this.updateInterval = updateInterval

    this.timeAfterLastUpdate = 0
    this.attributes = []
    this.isOkay = true
    this.failureTimes = 0

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

  getUpdateInterval() {
    return this.updateInterval
  }

  update(duration) {

    this.timeAfterLastUpdate += duration
    if (this.timeAfterLastUpdate < this.updateInterval) {
      return
    }

    let timesToUpdate = Math.floor(
      this.timeAfterLastUpdate / this.updateInterval
    )
    this.timeAfterLastUpdate = this.timeAfterLastUpdate % this.updateInterval

    for (let i = 0; i < timesToUpdate; i++) {
      if (!this.isOkay) {
        this.isOkay = true
      }

      this.updateSensorAttributes()
    }
  }

  updateSensorAttributes() {
    for (let i = 0; i < this.attributes.length; i++) {
      this.attributes[i].generateNewValue()

      if (
        this.attributes[i].value > this.attributes[i].max ||
        this.attributes[i].value < this.attributes[i].min
      ) {
        this.isOkay = false
        this.failureTimes++
      }
    }
  }
}
