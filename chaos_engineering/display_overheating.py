"""
This module POSTs a machine json with a fake temperature value
"""

import random
import json
import sys
import requests


def main():
    """ Launch display overheating script """
    browser_type = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"

    args = sys.argv[1:]

    request = requests.get("http://localhost:8000/machine" + args[0],
                           headers={
                               "User-Agent":
                               browser_type
                               })


    machine_json = request.json()
    machine_properties = machine_json['properties']
    over_heat = random.uniform(100, 200)
    machine_temperature = machine_properties['temperature']
    print(machine_temperature)
    machine_properties['temperature'] = over_heat
    print(machine_properties['temperature'])


    last_json = json.dumps(machine_json)
    requests.post('http://localhost:8000/fault', last_json)


if __name__ == '__main__':
    main()
