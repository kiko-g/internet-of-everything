"""
This module POSTs a machine json with properties with different formats
"""

import json
import requests


def main():
    """ Launch modify data format script"""
    browser_type = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"

    machine_request = requests.get("http://localhost:8000/machine1",
                                   headers={
                                       "User-Agent":
                                       browser_type
                                       })

    machine_json = machine_request.json()

    reading_time = machine_json['readingTime']
    machine_values = machine_json['values']

    machine_json['readingTime'] = {'readingTime':reading_time, 'values':machine_values}
    del machine_json['values']

    final_json = json.dumps(machine_json)

    requests.post('http://localhost:8000/fault', final_json)

if __name__ == '__main__':
    main()
