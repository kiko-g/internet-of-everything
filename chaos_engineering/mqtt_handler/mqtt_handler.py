""" mqtt integration """

import json
import paho.mqtt.client as mqtt


def on_connect(client, userdata, flags, rc):
    # pylint: disable = W, C
    # MQTT Callback, some arguments won't be used
    if rc == 0:
        print("connected OK Returned code=", rc)
    else:
        print("Bad connection Returned code=", rc)


def on_message(client, userdata, msg):
    # pylint: disable = W, C
    # MQTT Callback, some arguments won't be used
    mqtt_handler = userdata['handler']
    msg_str = str(msg.payload.decode("utf-8"))
    mqtt_handler.logs.append(msg_str)

    if mqtt_handler.print_raw:
        print(f'topic {msg.topic}, message: {msg_str}')

    try:
        msg_dict = json.loads(msg_str)
    except ValueError as e:
        return

    machines = mqtt_handler.machines
    machine_id = msg_dict['machineID']
    if machine_id not in machines:
        machines[machine_id] = {}
        machines[machine_id]['sensorID'] = {}

    machines[machine_id]['machineID'] = str(msg_dict['machineID'])
    machines[machine_id]['readingTime'] = str(msg_dict['readingTime'])
    values = machines[machine_id]['sensorID']
    values[msg_dict['sensorID']] = dict(msg_dict['values'])


class MQTTHandler:
    """ Handles mosquitto functions """

    def __init__(self, address, port, print_raw):
        self.address = address
        self.port = port
        self.print_raw = print_raw
        self.logs = []
        self.machines = {}
        self.userdata = {'handler': self}
        self.mqtt = mqtt.Client(userdata=self.userdata)
        self.mqtt.on_connect = on_connect
        self.mqtt.on_message = on_message
        self.mqtt.connect(address, 1883)

    def start(self):
        """ Starts mosquitto loop in a different thread """
        self.mqtt.loop_start()

    def stop(self):
        """ Stops mosquitto loop thread """
        self.mqtt.loop_stop()

    def subscribe(self, topic):
        """ Subscribes to a topic """
        self.mqtt.subscribe(topic)

    def unsubscribe(self, topic):
        """ Unsubscribes to a topic """
        self.mqtt.unsubscribe(topic)

    def publish(self, topic, payload):
        """ Publishes 'payload' to 'topic' """
        self.mqtt.publish(topic, payload)
