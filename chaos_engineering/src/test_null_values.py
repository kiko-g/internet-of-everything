"""
This module creates, sends and tests a null data reading in a machine topic
"""
import time
from mqtt_handler.mqtt_handler import MQTTHandler
from print_color import print_color, TerminalColor
from utils import test_result


def null_data_test(mqtt, machine_id, test_number, **kwargs):
    """ Test machine sensor overheating"""
    test_msg = f'Test #{test_number}: starting null reading test on {machine_id}'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"
    #failure_topic = f"failure/{machine_id}"

    payload = {
        "machineID": None,
        "readingTime": None,
        "values": {
            None: None,
        },
        "sensorID": None
    }

    payload_msg = f'Test #{test_number}: publishing payload {payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)

    mqtt.publish(machine_topic, payload)
    time.sleep(kwargs['delay'])

    expected_values = {
        "severity": "LOW",
        "readingTime": None,
        "machineID": None,
        "failureType": "FORMAT",
        "action": "WARNING",
        "description": "Invalid format for machineID or sensorID",
        "sensorID": None
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

    null_data_test(mqtt, machine_id, 0, **{'delay': 2})

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
