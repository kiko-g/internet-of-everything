import CuttingMachine from "./CuttingMachine.js";
import fs from "fs";
export default class JSONParser {

    constructor(){}

    parse(jsonFile){
        let json = fs.readFileSync(jsonFile);
        const machineDictionary = JSON.parse(json);
        let machines = [];
        let statingMachineID = machineDictionary[0]["startMachineID"];
        machineDictionary.shift();
        for (let i = 1; i < Object.keys(machineDictionary).length; i++) {
            let machineInfo = machineDictionary[i];
            
            let machine = new CuttingMachine(machineInfo['machineID'], machineInfo['readingTime'], machineInfo['links'])
            
            machine.setName(machineInfo['properties']['name']);
            machine.setStatus(machineInfo['properties']['status']);
            machine.setTemperature(machineInfo['properties']['temperature']);
            machine.setPiecesProduced(machineInfo['properties']['piecesProduced']);
            machine.setVolt(machineInfo['properties']['volt']);
            machine.setVibration(machineInfo['properties']['vibration']);
            machine.setPressure(machineInfo['properties']['pressure']); 
            machine.setRotate(machineInfo['properties']['rotate']);

            machines.push(machine);
        }      
        
        return machines;
    }    
}
