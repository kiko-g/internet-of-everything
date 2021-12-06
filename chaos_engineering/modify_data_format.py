import requests
import json

def main():

    machine_request = requests.get("http://localhost:8000/machine1",
                headers= {
                    "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
                }
            )
    machine_json = machine_request.json()
    
    reading_time = machine_json['reading-time']
    machine_properties = machine_json['properties']
    
    machine_json['reading-time'] = {'time':reading_time,'properties':machine_properties}
    del machine_json['properties']

    final_json = json.dumps(machine_json)

    requests.post('http://localhost:8000/fault', final_json)

if __name__ == '__main__':
    main()
