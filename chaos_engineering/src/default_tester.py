""" Module docstring """
import time
import random
from utils import get_config
from test_temperature import test_over as overheating_test
from test_temperature import test_under as underheating_test
from mqtt_handler.mqtt_handler import MQTTHandler


def main():
    """ Initiate automatic tester """
    print('Initiating default tester')

    config = get_config()
    if config is None:
        return -1

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
    for machine_id in config['machines']:
        mqtt.subscribe(f"machine/{machine_id}")
        mqtt.subscribe(f"failure/{machine_id}")

    temperature_args = {"delay": config['delay_after_payload']}

    tests = [
        (overheating_test, temperature_args),
        (underheating_test, temperature_args)
    ]

    # Execute random tests on a loop
    for i in range(config['max_test_occurences']):
        mqtt.erase_logs()
        machine_id = random.choice(config['machines'])
        test = random.choice(tests)

        test[0](mqtt=mqtt, machine_id=machine_id,
                test_number=i, **test[1])

        time.sleep(config['test_delay_seconds'])
        print()

    # stop mqtt thread in the background
    mqtt.stop()

    return 0


if __name__ == '__main__':
    main()
