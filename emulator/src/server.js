//const mqtt = require('mqtt');
const FactoryFloor = require('./FactoryFloor.js');
const Machine = require('./Machine.js');
const MQTTClient = require('./MQTTClient.js');
const {Sensor, EnergySensor, OrientationSensor, VelocitySensor, 
  PositionSensor, ProductionSpeedSensor, QRCodeSensor, TemperatureSensor, VibrationSensor} = require('./Sensors/Sensor.js');

const FACTORY_FLOOR_WIDTH = FACTORY_FLOOR_HEIGHT = 100;
const MQTT_OPTIONS = {
    clientId: "node_server",
    clean: true
};

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

      var machine = new Machine(json_config.id, 1, 1);

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

      floor.getMachine(machineId).getSensor(sensorId).compareValues(data.values);
  }
});
