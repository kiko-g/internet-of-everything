#pylint: skip-file
"""
incoherent_output_data
"""
import sys
import random
import string
import datetime
from mqtt_handler import MQTTHandler


def add_hours(hours):
    """ add hours to current time """
    current_date_and_time = datetime.datetime.now()
    hours_added = datetime.timedelta(hours=hours)
    future_date_and_time = current_date_and_time + hours_added
    return future_date_and_time


def get_random_string():
    """ random string with random length between 1 and 40 """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(random.randint(1, 40)))


def generate_machine_id(number_machines):
    """ generates random machine id """
    var_type = random.randint(1, 4)

    if var_type in (1, 2):
        return random.randint(0, number_machines)
    if var_type == 3:
        return get_random_string()
    if var_type == 4:
        return bool(random.randint(1, 2) == 1)
    return None


def generate_estimate_time():
    """ return estimated time until failure """
    rand = random.randint(1, 6)
    if rand in (1, 2):
        return None
    if rand in (3, 4):
        return add_hours(random.randint(0, 48))
    if rand == 5:
        return get_random_string()
    if rand == 6:
        if random.randint(1, 2) == 1:
            return True
        return False
    return None


def generate_description():
    """ generates a random machine description """
    number = random.randint(1, 5)
    if number in (1, 2):
        return get_random_string()
    if number == 3:
        return None
    if number == 4:
        return random.randint(1, 1000)
    if number == 5:
        if random.randint(1, 2) == 1:
            return True
        return False
    return None


def generate_sensor_id():
    """ generates a random sensor id """
    number = random.randint(1, 5)
    if number in (1, 2):
        return get_random_string()
    if number == 3:
        return None
    if number == 4:
        return random.randint(1, 1000)
    if number == 5:
        if random.randint(1, 2) == 1:
            return True
        return False
    return None


def generate_failure_severity():
    """ generates a random failure severity value """
    number = random.randint(1, 10)
    if number in (1, 6):
        number2 = random.randint(1, 4)
        if number2 == 1:
            return "LOW"
        if number2 == 2:
            return "MEDIUM"
        if number2 == 3:
            return "HIGH"
        if number2 == 4:
            return "CRITICAL"
    if number == 7:
        return get_random_string()
    if number == 8:
        return None
    if number == 9:
        return random.randint(1, 1000)
    if number == 10:
        if random.randint(1, 2) == 1:
            return True
        return False
    return None


def generate_failure_type():
    """generate failure type"""
    number = random.randint(1, 10)
    if number in (1, 6):
        number2 = random.randint(1, 3)
        if number2 == 1:
            return "UNKNOWN"
        if number2 == 2:
            return "UNDER_EXPECTED"
        if number2 == 3:
            return "ABOVE_EXPECTED"
    if number == 7:
        return get_random_string()
    if number == 8:
        return None
    if number == 9:
        return random.randint(1, 1000)
    if number == 10:
        if random.randint(1, 2) == 1:
            return True
        return False
    return None


def main():
    """ launches incoherent data POST """
    number_machines = 5000

    data = {
        "machineID": generate_machine_id(number_machines),
        "sensorID": generate_sensor_id(),
        "failureSeverity": generate_failure_severity(),
        "failureType": generate_failure_type(),
        "description": generate_description(),
        "readingTime": generate_estimate_time()
    }

    machine_1 = f'm{sys.argv[1]}'
    mqtt = MQTTHandler(1883, True)
    mqtt.start()
    mqtt.subscribe(f"machine/{machine_1}")

    mqtt.publish(f"machine/{machine_1}", data, 10, 1, 50)

    mqtt.stop()  # stop mqtt thread in the background


if __name__ == '__main__':
    main()
