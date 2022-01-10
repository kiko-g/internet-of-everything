"""
This module POSTs a machine json with a fake pressure value
"""

import random
import json
import sys
import requests


def main():
    """ Launch display over-pressure script """
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"

    args = sys.argv[1:]

    machine2_request = requests.get("http://localhost:8000/machine" + args[0],
                                    headers={
                                        "User-Agent":
                                        user_agent
                                    })

    machine_json = machine2_request.json()
    machine_properties = machine_json['properties']
    pressure = random.uniform(0, 100000)
    machine_properties['pressure'] = pressure

    last_json = json.dumps(machine_json)
    requests.post('http://localhost:8000/fault', last_json)

    if __name__ == '__main__':
        main()
