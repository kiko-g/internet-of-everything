import requests
import random
import json

def main():
    request = requests.get("http://localhost:8000/machine2",
                headers= {
                    "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
                }
                            )
    machine_json = request.json()
    machine_properties = machine_json['properties']
    overHeat = random.uniform(100, 200)
    machine_temperature = machine_properties['temperature']
    print(machine_temperature)
    machine_properties['temperature'] = overHeat
    print(machine_properties['temperature'])

  
    last_json = json.dumps(machine_json)
    requests.post('http://localhost:8000/fault', last_json)


if __name__ == '__main__':
    main()
    
