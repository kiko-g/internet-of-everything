"""
This module POSTs a machine json with a fake vibration value
"""

import random
import json
import sys
import requests


def main():
    """ Launch display over-vibration script """
    user_agent2 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"

    args = sys.argv[1:]

    request = requests.get("http://localhost:8000/machine" + args[0],
                           headers={
                               "User-Agent":
                               user_agent2
                           }
                           )
    machine_json = request.json()
    machine_properties = machine_json['properties']
    over_vibe = random.uniform(10, 100)
    machine_vibration = machine_properties['vibration']
    print(machine_vibration)
    machine_properties['vibration'] = over_vibe
    print(machine_properties['vibration'])

    last_json = json.dumps(machine_json)
    requests.post('http://localhost:8000/fault', last_json)


if __name__ == '__main__':
    main()
 