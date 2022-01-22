"""
This module launches a POST request with legitimate machine data on a loop to simulate a DDOS attack
when used by multiple computers
"""
import json
import requests

def main():
    """ Launch POST loop """
    machine_request = requests.get("http://localhost:8000/machine1", headers={
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
        })
    machine_json = machine_request.json()
    while True:
        requests.post('http://localhost:8000/fault', json.dumps(machine_json))

if __name__ == '__main__':
    main()
