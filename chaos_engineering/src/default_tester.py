""" Module docstring """
import time
from overheating import test as overheating_test
from mqtt_handler.mqtt_handler import MQTTHandler


def main():
    print('Initiating default tester')
    mqtt = MQTTHandler(1883, False)
    machine_id = 'machine1'
    # mqtt starts the client in another thread
    mqtt.start()
    time.sleep(2)
    # machine1 starts being updated by messages in the background
    mqtt.subscribe(f"machine/{machine_id}")
    mqtt.subscribe(f"failure/{machine_id}")
    # publish a single message to machine_1
    for i in range(200):
        overheating_test(mqtt, machine_id, 2, i)
        mqtt.erase_logs()
        time.sleep(3)

    # stop mqtt thread in the background
    mqtt.stop()


if __name__ == '__main__':
    main()
