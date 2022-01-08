const mqtt = require('mqtt');
const FactoryFloor = require('./FactoryFloor.js');
const Machine = require('./Machine.js');

const FACTORY_FLOOR_WIDTH = FACTORY_FLOOR_HEIGHT = 100;
const MQTT_OPTIONS = {
    clientId: "node_server",
    clean: true
};

const client  = mqtt.connect('mqtt://localhost', MQTT_OPTIONS);
const floor = new FactoryFloor(FACTORY_FLOOR_WIDTH, FACTORY_FLOOR_HEIGHT);

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    }
  })
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
