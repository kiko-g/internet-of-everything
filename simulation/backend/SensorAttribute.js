import randomNormal from "random-normal"

export default class SensorAttribute {
  constructor(name, min, max, avg, stdDeviation) {
    this.name = name
    this.min = min
    this.max = max
    this.avg = avg
    this.stdDeviation = stdDeviation
    this.value = randomNormal({ mean: this.avg, dev: this.stdDeviation })
  }

  generateNewValue() {
    this.value = randomNormal({ mean: this.avg, dev: this.stdDeviation })
  }

  getValue() {
    return this.value
  }
}
