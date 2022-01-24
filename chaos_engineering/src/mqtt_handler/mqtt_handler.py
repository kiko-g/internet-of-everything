""" mqtt integration """
import time
import random
import json
import os
import paho.mqtt.client as mqtt

from dotenv import load_dotenv


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
    mqtt_handler.logs[msg.topic].append(msg_str)

    if mqtt_handler.print_raw:
        print(f'topic {msg.topic}, message: {msg_str}')


class MQTTHandler:
    """ Handles mosquitto functions """

    def __init__(self, port, print_raw):
        load_dotenv()
        self.address = os.getenv('mosquitto_address')
        self.port = port
        self.print_raw = print_raw
        self.logs = {}
        self.userdata = {'handler': self}
        self.mqtt = mqtt.Client(userdata=self.userdata)
        self.mqtt.on_connect = on_connect
        self.mqtt.on_message = on_message
        self.mqtt.connect(self.address, 1883)

    def start(self):
        """ Starts mosquitto loop in a different thread """
        self.mqtt.loop_start()

    def stop(self):
        """ Stops mosquitto loop thread """
        self.mqtt.loop_stop()

    def subscribe(self, topic):
        """ Subscribes to a topic """
        self.logs[topic] = []
        self.mqtt.subscribe(topic)

    def unsubscribe(self, topic):
        """ Unsubscribes to a topic """
        self.logs.pop(topic)
        self.mqtt.unsubscribe(topic)

    def publish(self, topic, payload, max_occurences=1, time_interval=0, percent_chance=100):
        #pylint: disable=R0913
        """ Publishes 'payload' to 'topic' """
        last_time = time.time()
        occurences = 0

        while occurences != max_occurences:
            curr_time = time.time()

            if curr_time - last_time < time_interval:
                continue

            if random.randint(0, 100) < percent_chance:
                occurences += 1

                self.mqtt.publish(topic, json.dumps(payload))

                last_time = curr_time

    def erase_logs(self):
        """ Reset logs"""
        for key, _ in self.logs.items():
            self.logs[key] = []
