//const mqtt = require('mqtt');
const FactoryFloor = require('./FactoryFloor.js');
const Machine = require('./Machine.js');
const MQTTClient = require('./MQTTClient.js');
const {Sensor, EnergySensor, OrientationSensor, VelocitySensor, 
  PositionSensor, ProductionSpeedSensor, QRCodeSensor, TemperatureSensor, VibrationSensor} = require('./Sensors/Sensor.js');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

const FACTORY_FLOOR_WIDTH = FACTORY_FLOOR_HEIGHT = 100;

//const client = mqtt.connect('mqtt://localhost', MQTT_OPTIONS);
const client  = new MQTTClient();
var floor = new FactoryFloor(FACTORY_FLOOR_WIDTH, FACTORY_FLOOR_HEIGHT);

client.on('connect', function () {
  client.subscribe('startup');
  
  client.subscribe('machine/#');
});

client.on('message', function (topic, message) {

  if(topic == 'startup'){
    const json_config = JSON.parse(message.toString());
      //console.log(json_config);

      var machine = new Machine(json_config.id, 1, 1, json_config.input, json_config.output);

      for(let i = 0; i < json_config.sensors.length; i++){
        let sensor = json_config.sensors[i];

        switch(sensor.type){
          case "TEMPERATURE":
            machine.addSensor(new TemperatureSensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "ORIENTATION":
            machine.addSensor(new OrientationSensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "ENERGY":
            machine.addSensor(new EnergySensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "PRODUCTION_SPEED":
            machine.addSensor(new ProductionSpeedSensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "VIBRATION":
            machine.addSensor(new VibrationSensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "VELOCITY":
            machine.addSensor(new VelocitySensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          case "POSITION":
            machine.addSensor(new PositionSensor(sensor.id, sensor.updateInterval, sensor.attributes));
            break;
          default:
            break;
        }
        
      }

      floor.addMachine(machine, null, [json_config.nextMachineID]);
      return;
  }
  if (topic.startsWith("machine/")){
      const data = JSON.parse(message);

      const machineId = data.machineID;
      const sensorId = data.sensorID;

      const sensor = floor.getMachine(machineId).getSensor(sensorId);
      sensor.updateLatest(data.values);
      sensor.compareValues(data.values);
  }
});


// === DASHBOARD ===

app.get('/graph', (req, res) => {
  const machines = floor.getMachines();
  let res_machines = [];
  let res_edges = [];
  machines.forEach((machine, index) => {
    const id = machine.getID();
    const on = true;
    let ok = true;
    const sensors = machine.getSensors();
    for(let j = 0; j < sensors.length; j++){
      if (sensors[j].hasError)
      {
        ok = false;
        break;
      }
    }
    const connection = floor.getMachineConnections(id);
    res_machines.push({id: id, on: on, ok: ok});
    res_edges.push({from: id, to: Object.keys(connection)[0]});
  });

  res.send(
    {
      machines: res_machines,
      edges: res_edges
    }
  );

});

app.get('/machine/:machine_id', (req, res) => {
  const machine_id = req.params.machine_id;
  const machine = floor.getMachine(machine_id);
  const input = machine.input;
  const output = machine.output;
  let res_sensors = [];

  const sensors = machine.getSensors();
  sensors.forEach(sensor => {
    const id = sensor.id;
    const type = sensor.constructor.name;
    const latest_reading = sensor.latest_value;
    const error = sensor.hasError;
    res_sensors.push({id, type, error, latest_reading});
  });

  res.send(
    {
      sensors: res_sensors,
      input: input,
      output: output
    }
  );
});

app.listen(8083, function() {
  console.log('Listening for dashboard connections on port 8083');
});