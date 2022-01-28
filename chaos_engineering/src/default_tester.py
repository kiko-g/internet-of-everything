""" Module docstring """
import time
import random
from utils import get_config
from test_temperature import overheating_test, underheating_test
from test_vibration import undervibration_test, overvibration_test
from test_energy import underenergy_test, overenergy_test, nullenergy_test
from mqtt_handler.mqtt_handler import MQTTHandler


def print_statistics(statistics):
    """ Print the statistics """

    print("|      Test Name       | Number of Tests | Aborted | Aborted (%) "
          "| Passed | Passed (%) | Failed | Failed (%) |")
    print()

    for test_name, values in statistics.items():
        no_tests = sum(values)
        aborted = values[0] * 100 / no_tests if no_tests else 0
        passed = values[1] * 100 / no_tests if no_tests else 0
        failed = values[2] * 100 / no_tests if no_tests else 0

        print(f"| {test_name:<20}"
              f" | {no_tests:<15}"
              f" | {values[0]:<7}"
              f" | {aborted:<11.2f}"
              f" | {values[1]:<6}"
              f" | {passed:<10.2f}"
              f" | {values[2]:<6}"
              f" | {failed:<10.2f} |")

        print()
        values = [0, 0, 0]

    return statistics


def main():
    """ Initiate automatic tester """
    print('Initiating default tester')

    config = get_config()
    if config is None:
        return -1

    try:
        mqtt = MQTTHandler(1883, False)
    except ConnectionRefusedError:
        print('Connection refused: check if mosquitto is running in the address specified in .env')
        return -1

    # mqtt starts the client in another thread
    mqtt.start()
    # Wait for connection
    time.sleep(2)
    # Make all channel subscriptions
    for machine_id in config['machines']:
        mqtt.subscribe(f"machine/{machine_id}")
        mqtt.subscribe(f"failure/{machine_id}")

    delay_only_args = {"delay": config['delay_after_payload']}

    tests = [
        (overheating_test, delay_only_args),
        (underheating_test, delay_only_args),
        (undervibration_test, delay_only_args),
        (overvibration_test, delay_only_args),
        (overenergy_test, delay_only_args),
        (underenergy_test, delay_only_args),
        (nullenergy_test, delay_only_args),
    ]

    start = time.time()
    statistics = {
        'overheating_test': [0, 0, 0],
        'underheating_test': [0, 0, 0],
        'undervibration_test': [0, 0, 0],
        'overvibration_test': [0, 0, 0],
        'overenergy_test': [0, 0, 0],
        'underenergy_test': [0, 0, 0],
        'nullenergy_test': [0, 0, 0],
    }

    # Execute random tests on a loop
    for i in range(config['max_test_occurences']):
        end = time.time()
        if end - start > 60:
            start = time.time()
            statistics = print_statistics(statistics)

        mqtt.erase_logs()

        machine_id = random.choice(config['machines'])

        test = random.choice(tests)
        func = test[0]
        args = test[1]
        success = func(mqtt, machine_id, i, **args)

        statistics[func.__name__][success + 1] += 1

        time.sleep(config['test_delay_seconds'])
        print()

    # stop mqtt thread in the background
    mqtt.stop()

    return 0


if __name__ == '__main__':
    main()
