const mqtt = require('mqtt');
const FactoryFloor = require('./FactoryFloor.js');
const Machine = require('./Machine.js');

const FACTORY_FLOOR_WIDTH = FACTORY_FLOOR_HEIGHT = 100;
const MQTT_OPTIONS = {
    clientId: "node_server",
    clean: true
};

const client = mqtt.connect('mqtt://localhost', MQTT_OPTIONS);
const floor = new FactoryFloor(FACTORY_FLOOR_WIDTH, FACTORY_FLOOR_HEIGHT);

// getting data from json file (tmp)
const factoryData = require('./factoryData.json');

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt');

      for(let i = 0; i < factoryData.machines.length; i++){
        floor.addMachine(new Machine(factoryData.machines[i].id, 1, 1), null, [factoryData.machines[i].nextMachineID]);
        client.subscibe('edge/' + factoryData.machines[i].id);
    }
  }})
  client.subscribe('testTopic');
});

var DataReceived = {
  "machineID": "machine1",
  "sensorID": "position1",
  "values": {
      "x": 3.0,
      "y": 1.0
  },
  "readingTime": "31-12-2021 00:30:46.610169"
}

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received Message:', topic, message.toString());
  // client.end();

  if(topic == 'sensorTopic'){
  //   message = {
  //     "machineID": String,
  //     "sensorID": String,
  //     "values": {
  //         "valueName1": Double,
  //         "valueName2": Double,
  //         "valueNameN": Double,
  //     },
  //     "readingTime": String
  //  }
    const data = JSON.parse(message);

    const machineId = data.machineID;
    const sensorId = data.sensorID;

    this.floor.getMachine(machineId).getSensor(sensorId);
  }
});
