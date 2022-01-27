import randomNormal from "random-normal"

export default class SensorAttribute {
  /**
   * 
   * @param {String} name - attribute's name
   * @param {float} min - Minimum value
   * @param {float} max - Maximum value
   * @param {float} avg - Average value
   * @param {float} stdDeviation - standard deviation from the average
   */
  constructor(name, min, max, avg, stdDeviation) {
    this.name = name
    this.min = min
    this.max = max
    this.avg = avg
    this.stdDeviation = stdDeviation

    // Generate a value for the sensor based on a normal distribution
    this.value = randomNormal({ mean: this.avg, dev: this.stdDeviation })
  }

  /**
   * Generate a value for the sensor based on a normal distribution
   */
  generateNewValue() {
    this.value = randomNormal({ mean: this.avg, dev: this.stdDeviation })
  }

  /**
   * @returns Sensor's value
   */
  getValue() {
    return this.value
  }
}

