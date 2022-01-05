import Machine from "./Machine.js"
import Sensor from "./Sensor.js"
import fs from "fs"
export default class JSONParser {
  constructor() {}

  parse(jsonFile) {
    let json = fs.readFileSync(jsonFile)
    let parsedJson = JSON.parse(json);
    let batches = parsedJson.batches;
    let startMachineID = parsedJson.startMachineID;
    const machineDictionary = parsedJson.machines
    let machines = []

    for (let i = 0; i < Object.keys(machineDictionary).length; i++) {
      let machineInfo = machineDictionary[i]
      let machine = new Machine(machineInfo.id)

      machine.setStatus(machineInfo.status)
      machine.setDefectProbability(machineInfo.defectProbability)
      machine.setInput(machineInfo.input)
      machine.setOutput(machineInfo.output)
      machine.setTimePerBatch(machineInfo.timePerBatch);
      machine.setNextMachineID(machineInfo.nextMachineID)

      for (const sensorInfo of Object.values(machineInfo.sensors)) {
        machine.addSensor(
          new Sensor(sensorInfo.id, sensorInfo.type, sensorInfo.attributes)
        )
      }
      machines.push(machine)
    }


    return [batches, startMachineID, machines]
  }
}
