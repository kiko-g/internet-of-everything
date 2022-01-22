"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
import time
import json
import random
from print_color import print_color, TerminalColor
from mqtt_handler.mqtt_handler import MQTTHandler


def test(mqtt, machine_id, delay, test_number):
    """ Test machine sensor overheating"""
    test_msg = f'Test #{test_number}: starting test'
    print_color(test_msg, TerminalColor.OKBLUE)

    machine_topic = f"machine/{machine_id}"
    failure_topic = f"failure/{machine_id}"

    base_payload = None
    attempts = 0
    while base_payload is None:
        if attempts > 4:
            error_msg = f"Test #{test_number} failed to run, perhaps edge layer not running"
            print_color(error_msg, TerminalColor.FAIL)
            return -1

        for log in mqtt.logs[machine_topic][::-1]:
            if '\"temperature1\"' in log:
                base_payload = json.loads(log)

        warn_msg = f"Test #{test_number} Temperature1 not found in logs, retrying in 1 second"
        print_color(warn_msg, TerminalColor.WARNING)
        time.sleep(1)
        attempts += 1

    # edge case
    if base_payload['values']['temperature'] == 'null':
        base_payload['values']['temperature'] = 0

    base_payload['values']['temperature'] = random.randint(100, 200)

    payload_msg = f'Test #{test_number}: publishing payload {base_payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)

    mqtt.publish(machine_topic, base_payload)

    time.sleep(delay)

    expected_result = '{'\
        '"failureSeverity":"HIGH",'\
        f'"readingTime":"{base_payload["readingTime"]}",'\
        f'"machineID":"{machine_id}",'\
        '"failureType":"ABOVE_EXPECTED",'\
        f'"description":"Detected value: {base_payload["values"]["temperature"]}",'\
        '"sensorID":"temperature1"'\
        '}'

    if expected_result in mqtt.logs[failure_topic]:
        msg = f'Test #{test_number} sucessful expected result:{expected_result} found'
        print_color(msg, TerminalColor.OKGREEN)
        return 0

    msg = f'Test #{test_number} failed expected result:{expected_result} NOT found'
    print_color(msg, TerminalColor.FAIL)
    return 1


def main():
    """ Launch mqtt test """
    mqtt = MQTTHandler(1883, False)
    machine_id = 'machine1'
    # mqtt starts the client in another thread
    mqtt.start()

    # machine1 starts being updated by messages in the background
    mqtt.subscribe(f"machine/{machine_id}")
    mqtt.subscribe(f"failure/{machine_id}")
    # publish a single message to machine_1

    test(mqtt, machine_id, 2, 0)

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
