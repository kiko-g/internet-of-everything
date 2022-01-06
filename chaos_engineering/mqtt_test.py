"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
from time import sleep
import json
from mqtt_handler.mqtt_handler import MQTTHandler


def main():
    """ Launch mqtt test """
    mqtt = MQTTHandler("localhost", 1883, True)
    mqtt.start()  # mqtt starts the client in another thread
    # m1 starts being updated by messages in the background
    mqtt.subscribe("machine/m1")
    sleep(4)  # wait for m1 to have all sensors updated

    # make this a loop if needed

    # Make copy of m1 so we can work with it without affecting the mqtt dict
    # on another thread
    machine_1 = dict(mqtt.machines['m1'])
    machine_1['values']['temperature'] = 3.054
    print(machine_1)
    # publish machine_1
    mqtt.publish('machine/machine_1', json.dumps(machine_1))

    # make this a loop if needed

    mqtt.stop()  # stop mqtt thread in the background


if __name__ == '__main__':
    main()
