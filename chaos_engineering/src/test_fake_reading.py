"""
This module creates, sends and tests a fake data reading in a machine topic
"""
import time
import random
from print_color import print_color, TerminalColor
from mqtt_handler.mqtt_handler import MQTTHandler


def fake_data_test(mqtt, machine_id, test_number, **kwargs):
    """ Test machine sensor overheating"""
    test_msg = f'Test #{test_number}: starting fake reading test on {machine_id}'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"
    #failure_topic = f"failure/{machine_id}"

    payload = {
        "machineID": random.randint(0, 1000),
        "readingTime": random.randint(0, 100000000000),
        "values": {
            "vibration": random.randint(0, 1000),
        },
        "sensorID": f"vibration{random.randint(0, 50)}"
    }

    payload_msg = f'Test #{test_number}: publishing payload {payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)

    mqtt.publish(machine_topic, payload)
    time.sleep(kwargs['delay'])

    print_color(
        f'Test #{test_number}: Cant yet verify this result', TerminalColor.WARNING
    )
    return -1


def main():
    """ Launch over and under temperature test """
    mqtt = MQTTHandler(1883, False)
    machine_id = 'machine1'
    # mqtt starts the client in another thread
    mqtt.start()

    # machine1 starts being updated by messages in the background
    mqtt.subscribe(f"machine/{machine_id}")
    mqtt.subscribe(f"failure/{machine_id}")
    # publish a single message to machine_1

    fake_data_test(mqtt, machine_id, 0, **{'delay': 2})

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
