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
  client.subscribe('startup', function(err){
    if (err) {
      console.error('Failed to subscribe to startup.');
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  switch(topic) {
    case 'startup':
      const json_config = JSON.parse(message.toString());
      console.log(json_config);
      break;
    default:
      console.log(message.toString());
  }
  // client.end();
});
