const FactoryFloor = require('./FactoryFloor.js');
const Machine = require('./Machine.js');
const MQTTClient = require('./MQTTClient.js');

const FACTORY_FLOOR_WIDTH = FACTORY_FLOOR_HEIGHT = 100;

const client  = new MQTTClient();
const floor = new FactoryFloor(FACTORY_FLOOR_WIDTH, FACTORY_FLOOR_HEIGHT);

