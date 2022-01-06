"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
from time import sleep
import json
from mqtt_handler.mqtt_handler import MQTTHandler


def main():
    """ Launch mqtt test """
    # 172.18.0.6 - mosquitto in docker
    mqtt = MQTTHandler("localhost", 1883, True)
    mqtt.start()  # mqtt starts the client in another thread
    # m1 starts being updated by messages in the background
    mqtt.subscribe("machine/m1")
    sleep(10)  # wait for m1 to have all sensors updated

    # make this a loop if needed

    # Make copy of m1 so we can work with it without affecting the mqtt dict
    # on another thread
    machine_1 = dict(mqtt.machines['m1'])
    print(f'machine 1 values: {machine_1}')
    temp_sensor = machine_1['sensorID']['temp1']
    temp_value = temp_sensor['temperature']

    my_payload = {
        'readingTime': machine_1['readingTime'],
        'machineID': machine_1['machineID'],
        'values': {
            'temperature': temp_value + 5
        },
        'sensorID': 'temp2'
    }
    # publish machine_1
    mqtt.publish('machine/m1', json.dumps(my_payload))

    # make this a loop if needed

    sleep(2)  # Give time to read back message

    mqtt.stop()  # stop mqtt thread in the background


if __name__ == '__main__':
    main()
