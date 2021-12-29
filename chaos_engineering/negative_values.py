"""
{
    Unique identifyer of each machine
    "machineID": int,
    //Time of the reading
    "reading-time": datetime(mmhhYYYYMMDD),
    //The information from the machine, ie. not the headings
    "properties": {
        //The temperature read from a thermometer
        "temperature": float (Celsius),
        //Pieces produced since last reading
        "piecesProduced": int,
        //Voltage consumed in reading moment
        "volt": float (Volts),
        //Average vibration since last reading
        "vibration": float (mm/s),
        //Pressure in moment of reading
        "pressure": float (psi),
        //Rotation in moment of reading
        "rotate" : float (Hz)
    }
}
"""

import json
import random
import datetime
import requests


def generate_machine_id(number_machines):
    """generate random machine_id"""
    return random.randint(-number_machines, number_machines)


def generate_temperature():
    """generate random temperature"""
    return random.randint(-300, 1000)


def generate_pieces_produced():
    """generate random number of pieces produced"""
    return random.randint(-300, 1000)


def generate_volt():
    """generate random voltage"""
    return random.randint(-1000, 1000)


def generate_vibration():
    """generate random vibration"""
    return random.randint(-1000, 1000)


def generate_pressure():
    """generate random pressure"""
    return random.randint(-10000, 10000)


def generate_rotate():
    """generate random rotation"""
    return random.randint(-1000, 1000)


def generate_reading_time():
    """generate random reading time"""

    hours = random.randint(-100, 100)

    date = datetime.datetime.now()

    hours_added = datetime.timedelta(hours=hours)

    date = date + hours_added

    return date.isoformat()


def negative_values():
    """generate json of random values"""
    number_machines = 5000

    data = {
        "machineID": generate_machine_id(number_machines),
        "reading-time": generate_reading_time(),
        "properties": {
            "temperature": generate_temperature(),
            "piecesProduced": generate_pieces_produced(),
            "volt": generate_volt(),
            "vibration": generate_vibration(),
            "pressure": generate_pressure(),
            "rotate": generate_rotate()

        }
    }
    return json.dumps(data)


def main():
    """main"""
    post_data = negative_values()

    # print(json.dumps(data))
    requests.post('http://localhost:8000/central', post_data)


if __name__ == '__main__':
    main()
