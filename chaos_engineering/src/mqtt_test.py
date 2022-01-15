"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
from time import sleep
from mqtt_handler.mqtt_handler import MQTTHandler


def my_payload(mqtt, machine):
    """ generate my payload """
    # Make copy of machine1 so we can work with it without affecting the mqtt dict
    # on another thread
    machine_1 = dict(mqtt.machines[machine])
    print(f'machine 1 values: {machine_1}')
    temp_sensor = machine_1['sensorID']['temp1']
    temp_value = temp_sensor['temperature']

    payload = {
        'readingTime': machine_1['readingTime'],
        'machineID': machine_1['machineID'],
        'values': {
            'temperature': temp_value + 5
        },
        'sensorID': 'temp2'
    }
    return payload


def main():
    """ Launch mqtt test """
    mqtt = MQTTHandler(1883, True)

    # mqtt starts the client in another thread
    mqtt.start()

    # machine1 starts being updated by messages in the background
    mqtt.subscribe("machine/machine1")

    # wait for machine1 to have temp1 sensor updated
    mqtt.wait_for('machine1', 'temp1')

    # publish a single message to machine_1
    payload_lambda = lambda: my_payload(mqtt, 'machine1')
    mqtt.publish('machine/machine1', payload_lambda)

    # keep publishing a message to machine_1 until
    #   10 messages have been published
    #   With attemps every 2 seconds
    #   with 25% chance of publishing on each attempt
    mqtt.publish('machine/machine1', payload_lambda, 10, 2, 25)

    # Give time to read back messages
    sleep(2)

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
