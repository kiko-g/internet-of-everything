"""
This module creates, sends and tests a fake data reading in a machine topic
"""
import time
import random
from print_color import print_color, TerminalColor
from mqtt_handler.mqtt_handler import MQTTHandler
from utils import test_result


def fake_data_test(mqtt, machine_id, test_number, **kwargs):
    """ Test machine sensor overheating"""
    test_msg = f'Test #{test_number}: starting fake reading test on {machine_id}'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"
    #failure_topic = f"failure/{machine_id}"

    payload = {
        "machineID": machine_id,
        "readingTime": "26-01-2022 17:44:37.811368",
        "values": {
            "vibration": random.randint(10, 1000),
        },
        "sensorID": f"vibration{random.randint(0, 50)}"
    }

    payload_msg = f'Test #{test_number}: publishing payload {payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)

    mqtt.publish(machine_topic, payload)
    time.sleep(kwargs['delay'])

    expected_values = {
        "severity": "LOW",
        "readingTime": payload["readingTime"],
        "machineID": machine_id,
        "failureType": "UNKNOWN",
        "action": "WARNING",
        "description": "unknow sensorID",
        "sensorID": payload["sensorID"]
    }

    failure_topic = f"failure/{machine_id}"

    return test_result(mqtt, expected_values, failure_topic, test_number)


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
