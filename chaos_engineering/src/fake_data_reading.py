"""
This module POSTs a machine json with a fake data
"""

import json
import random
import requests

def create_fake_data_reading():
    """ Create json with fake data """
    fake_reading = {
        "machineID": random.randint(0, 1000),
        "reading-time": random.randint(0, 100000000000),
        "properties":
            {
                "status": random.randint(0, 1000),
                "temperature": random.randint(0, 1000),
                "piecesProduced": random.randint(0, 1000),
                "volt": random.randint(0, 1000),
                "vibration": random.randint(0, 1000),
                "pressure": random.randint(0, 1000),
                "rotate": random.randint(0, 1000)
            }}
    json_fake_reading = json.dumps(fake_reading)
    return json_fake_reading


def main():
    """ Launch fake data reading script """
    json_reading = create_fake_data_reading()
    requests.post('http://localhost:8000/fault', json_reading)


if __name__ == '__main__':
    main()
