""" Module docstring """
import time
import json
import random
from overheating import test as overheating_test
from mqtt_handler.mqtt_handler import MQTTHandler


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


def main():
    """ Initiate automatic tester """
    print('Initiating default tester')

    config = get_config()
    if config is None:
        return -1

    machines = config['machines']
    machines_last_idx = len(machines) - 1

    try:
        mqtt = MQTTHandler(1883, False)
    except ConnectionRefusedError:
        print('Connection refused: check if mosquitto is running in the adress specified in .env')
        return -1

    # mqtt starts the client in another thread
    mqtt.start()
    # Wait for connection
    time.sleep(2)
    # Make all channel subscriptions
    for machine_id in machines:
        mqtt.subscribe(f"machine/{machine_id}")
        mqtt.subscribe(f"failure/{machine_id}")

    # Execute random tests on a loop
    for i in range(config['max_test_occurences']):
        mqtt.erase_logs()
        machine_id = machines[random.randint(0, machines_last_idx)]
        overheating_test(mqtt, machine_id, config['delay_after_payload'], i)
        time.sleep(config['test_delay_seconds'])

    # stop mqtt thread in the background
    mqtt.stop()

    return 0


if __name__ == '__main__':
    main()
