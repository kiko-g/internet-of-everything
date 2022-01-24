"""
null means that the field is optional,
may not be present depending on the other fields
ex.: If the status is ok, there's no error description
{
    //Unique identifyer of each machine
    "machineID": int
    //Danger level
    //OK - No error
    //Warning - Error may occur in the future
    //Critical - An error is about to occur
    //Failed - With the current reading the machine should already have failed
    "status": "Ok" | "Warning" | "Critical" | "Failed",
    //Estimated time to fail if error is not fixed
    //Null if the current state will not lead to fail
    "time-untill-failure": null | datetime
    //Unique identifier of common errors
    "errorID": int
    //Description
    //Null if status is ok, there's no description needed
    "description": null | string
}
"""
import json
import random
import string
import datetime
import requests


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

def get_random_status():
    """ return a random machine status """
    rand = random.randint(1, 4)
    if rand == 1:
        return "OK"
    if rand == 2:
        return "Critical"
    if rand == 3:
        return "Warning"
    if rand == 4:
        return "Failure"
    return None

def generate_estimate_fail():
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

def generate_error_id():
    """ generates a random error id """
    rand = random.randint(1, 6)
    if rand in (1, 3):
        return random.randint(1, 1000)
    if rand == 4:
        return get_random_string()
    if rand == 5:
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

def main():
    """ launches incoherent data POST """
    number_machines = 5000

    data = {
        "machineID": generate_machine_id(number_machines),
        "status": get_random_status(),
        "time-untill-failure": generate_estimate_fail(),
        "errorID": generate_error_id(),
        "description": generate_description()
    }

    requests.post('http://localhost:8000/fault', json.dumps(data))

if __name__ == '__main__':
    main()
