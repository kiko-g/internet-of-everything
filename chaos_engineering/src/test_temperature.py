"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
import time
import random
from print_color import print_color, TerminalColor
from mqtt_handler.mqtt_handler import MQTTHandler
from utils import get_payload_with_term, test_result


def overheating_test(mqtt, machine_id, test_number, **kwargs):
    """ Test temperature too high """

    base_payload = test(mqtt, machine_id, test_number,
                        kwargs["delay"], random.randint(100, 200))
    if base_payload is None:
        return -1

    description = f'Detected value: {float(base_payload["values"]["temperature"])}'

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


def underheating_test(mqtt, machine_id, test_number, **kwargs):
    """ Test temperature too low """
    base_payload = test(mqtt, machine_id, test_number,
                        kwargs["delay"], -random.randint(50, 70))
    if base_payload is None:
        return -1

    description = f'Detected value: {float(base_payload["values"]["temperature"])}'

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
    test_msg = f'Test #{test_number}: starting temperature test on {machine_id}'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"

    base_payload = get_payload_with_term(
        mqtt, machine_topic, "temperature", test_number, 4)

    if base_payload is None:
        return None

    # edge case
    if base_payload['values']['temperature'] == 'null':
        base_payload['values']['temperature'] = 0

    base_payload['values']['temperature'] += value

    payload_msg = f'Test #{test_number}: publishing payload {base_payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)

    mqtt.publish(machine_topic, base_payload)

    time.sleep(delay)
    return base_payload


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

    overheating_test(mqtt, machine_id, 0, delay=2)

    underheating_test(mqtt, machine_id, 0, delay=2)

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
