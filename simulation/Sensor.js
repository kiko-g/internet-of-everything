import SensorAttribute from "./SensorAttribute.js"

export default class Sensor {
  /**
   * 
   * @param id - Sensor's ID
   * @param type - Sensor's Type
   * @param updateInterval - Sensor's update interval
   * @param attributes  - List of the Sensor's attributes
   */
  constructor(id, type, updateInterval, attributes) {
    this.id = id
    this.type = type
    this.updateInterval = updateInterval
    this.attributes = []

    this.timeAfterLastUpdate = 0  // Total number of times units after the last update
    this.isOkay = true            // Boolean representing if the sensor is okay or not
    this.failureTimes = 0         // Total number of times the sensor has failed

    // For each entry in the attributes dictionary received, create a new sensor
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
  
  /**
   * @returns Sensor's update interval
   */
  getUpdateInterval() {
    return this.updateInterval
  }

  /**
   * Updates the Sensor's attributes value and checks wheter they are in the supposed values
   * @param {float} duration 
   * @returns 
   */
  update(duration) {
    // Check if it has passed enough time for the sensor to update
    this.timeAfterLastUpdate += duration
    if (this.timeAfterLastUpdate < this.updateInterval) {
      return
    }

    // Calculate the number of times the sensor has to update based on the time that has passed
    let timesToUpdate = Math.floor(
      this.timeAfterLastUpdate / this.updateInterval
    )
    this.timeAfterLastUpdate = this.timeAfterLastUpdate % this.updateInterval
    
    // update the sensor by calculating new values for each of its attribiutes
    for (let i = 0; i < timesToUpdate; i++) {
      if (!this.isOkay) {
        this.isOkay = true
      }

      this.updateSensorAttributes()
    }
  }

  /**
   * Updates all the attributes of this sensor
   */
  updateSensorAttributes() {
    // For each attribute that this sensor has, generate a new value
    for (let i = 0; i < this.attributes.length; i++) {
      this.attributes[i].generateNewValue()

      // Check if the value is between the desired bound, if not the sensor has failed
      if (this.attributes[i].value > this.attributes[i].max || this.attributes[i].value < this.attributes[i].min) {
        this.isOkay = false
        this.failureTimes++
      }
    }
  }
}
