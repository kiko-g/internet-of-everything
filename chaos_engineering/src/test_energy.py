"""
This module runs tests on energy sensors
"""
import time
import random
from print_color import print_color, TerminalColor
from mqtt_handler.mqtt_handler import MQTTHandler
from utils import get_payload_with_term, test_result, publish_payload


def overenergy_test(mqtt, machine_id, test_number, **kwargs):
    """ Test energy too high """

    base_payload = test(mqtt, machine_id, test_number,
                        kwargs["delay"], random.randint(70, 100))
    if base_payload is None:
        return -1

    description = f'Detected value: {float(base_payload["values"]["energy"])}'

    expected_values = {
        "severity": "HIGH",
        "readingTime": base_payload["readingTime"],
        "machineID": machine_id,
        "failureType": "ABOVE_EXPECTED",
        "action": "POWEROFF",
        "description": description,
        "sensorID": base_payload["sensorID"]
    }

    failure_topic = f"failure/{machine_id}"

    return test_result(mqtt, expected_values, failure_topic, test_number)


def underenergy_test(mqtt, machine_id, test_number, **kwargs):
    """ Test energy too low """
    base_payload = test(mqtt, machine_id, test_number,
                        kwargs["delay"], -random.randint(70, 100))
    if base_payload is None:
        return -1

    description = f'Detected value: {float(base_payload["values"]["energy"])}'

    expected_values = {
        "severity": "HIGH",
        "readingTime": base_payload["readingTime"],
        "machineID": machine_id,
        "failureType": "UNDER_EXPECTED",
        "action": "POWEROFF",
        "description": description,
        "sensorID": base_payload["sensorID"]
    }

    failure_topic = f"failure/{machine_id}"

    return test_result(mqtt, expected_values, failure_topic, test_number)


def nullenergy_test(mqtt, machine_id, test_number, **kwargs):
    """ Test energy to have no voltage """
    base_payload = test(mqtt, machine_id, test_number,
                        kwargs["delay"], 0)
    if base_payload is None:
        return -1

    description = f'Detected value: {float(base_payload["values"]["energy"])}'

    expected_values = {
        "severity": "HIGH",
        "readingTime": base_payload["readingTime"],
        "machineID": machine_id,
        "failureType": "UNDER_EXPECTED",
        "action": "POWEROFF",
        "description": description,
        "sensorID": base_payload["sensorID"]
    }
    failure_topic = f"failure/{machine_id}"

    return test_result(mqtt, expected_values, failure_topic, test_number)


def test(mqtt, machine_id, test_number, delay, value):
    """ Test machine sensor overheating"""
    test_msg = f'Test #{test_number}: starting energy test on {machine_id}'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"

    base_payload = get_payload_with_term(
        mqtt, machine_topic, "energy", test_number, 4)

    if base_payload is None:
        return None

    # edge case
    if base_payload['values']['energy'] == 'null':
        base_payload['values']['energy'] = 0

    base_payload['values']['energy'] += value if value else - \
        base_payload['values']['energy']

    publish_payload(mqtt, base_payload, test_number, machine_topic)

    time.sleep(delay)
    return base_payload


def main():
    """ Launch over and under energy test """
    mqtt = MQTTHandler(1883, False)
    machine_id = 'machine1'
    # mqtt starts the client in another thread
    mqtt.start()

    # machine1 starts being updated by messages in the background
    mqtt.subscribe(f"machine/{machine_id}")
    mqtt.subscribe(f"failure/{machine_id}")
    # publish a single message to machine_1
    underenergy_test(mqtt, machine_id, 0, delay=2)
    overenergy_test(mqtt, machine_id, 0, delay=2)
    underenergy_test(mqtt, machine_id, 0, delay=2)
    nullenergy_test(mqtt, machine_id, 0, delay=2)

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
