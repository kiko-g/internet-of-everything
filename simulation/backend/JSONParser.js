import Machine from "./Machine.js"
import Sensor from "./Sensor.js"

export default class JSONParser {
  constructor() {}

  parse(jsonFile) {
    let batches = jsonFile.batches
    let startMachineID = jsonFile.startMachineID
    const machineDictionary = jsonFile.machines

    let machines = {}

    for (let i = 0; i < Object.keys(machineDictionary).length; i++) {
      let machineInfo = machineDictionary[i]
      let machine = new Machine(machineInfo.id)

      machine.setStatus(machineInfo.status)
      machine.setDefectProbability(machineInfo.defectProbability)
      machine.setInput(machineInfo.input)
      machine.setOutput(machineInfo.output)
      machine.setTimePerBatch(machineInfo.timePerBatch)
      machine.setNextMachineID(machineInfo.nextMachineID)

      for (const sensorInfo of Object.values(machineInfo.sensors)) {
        machine.addSensor(
          new Sensor(
            sensorInfo.id,
            sensorInfo.type,
            sensorInfo.updateInterval,
            sensorInfo.attributes
          )
        )
      }
      machines[machine.id] = machine
    }

    return [batches, startMachineID, machines]
  }
}
