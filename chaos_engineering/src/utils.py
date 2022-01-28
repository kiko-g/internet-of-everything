""" Module for general helper functions """
import time
import json
from print_color import print_color, TerminalColor


def generate_expected_result(result):
    "Generate result json string"
    return '{'\
        f'"failureSeverity":"{result["severity"]}",'\
        f'"readingTime":"{result["readingTime"]}",'\
        f'"machineID":"{result["machineID"]}",'\
        f'"failureType":"{result["failureType"]}",'\
        f'"action":"{result["action"]}",'\
        f'"description":"{result["description"]}",'\
        f'"sensorID":"{result["sensorID"]}"'\
        '}'


def test_result(mqtt, expected_values, failure_topic, test_number):
    """ Prints the result of the tests, returns 0 on success, 1 on failure """
    expected_result = generate_expected_result(expected_values)

    if expected_result in mqtt.logs[failure_topic]:
        msg = f'Test #{test_number} sucessful expected result:{expected_result} found'
        print_color(msg, TerminalColor.OKGREEN)
        return 0

    msg = f'Test #{test_number} failed expected result:{expected_result} NOT found'
    print_color(msg, TerminalColor.FAIL)
    return 1


def get_payload_with_term(mqtt, machine_topic, term, test_number, max_attempts):
    """ Does <max_attempts> at getting a specific log from mqtt """
    base_payload = None
    attempts = 0
    while base_payload is None:
        if attempts > max_attempts:
            error_msg = f"Test #{test_number} was aborted, perhaps edge layer not running "\
                "or machine does not have required sensor"
            print_color(error_msg, TerminalColor.ORAGE_WARNING)
            return None
        time.sleep(1)
        for log in mqtt.logs[machine_topic][::-1]:
            if f'\"{term}\"' in log:
                base_payload = json.loads(log)

        if base_payload is None:
            warn_msg = f"Test #{test_number} {term} not found in logs, retrying in 1 second"
            print_color(warn_msg, TerminalColor.WARNING)

        attempts += 1

    return base_payload


def publish_payload(mqtt, payload, test_number, machine_topic):
    """ Prints and publishes a payload to a machine topic """
    payload_msg = f'Test #{test_number}: publishing payload {payload} to {machine_topic}'
    print_color(payload_msg, TerminalColor.OKCYAN)
    mqtt.publish(machine_topic, payload)


def get_config():
    """ Get Json Configuration """
    config_location = 'src/static/config.json'
    try:
        with open(config_location) as file_input:
            config = json.loads(file_input.read())
    except FileNotFoundError:
        print(f'Failed to read config at {config_location}, aborting')
        return None
    return config
